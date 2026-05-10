import { useState, useRef, useCallback } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lato:wght@300;400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --deep: #880e4f;
    --vivid: #e91e8c;
    --mid: #c2185b;
    --blush: #fce4ec;
    --petal: #f8bbd0;
    --green: #6ab04c;
    --leaf: #4a8a30;
    --cream: #fff9f2;
    --gold: #f9a825;
  }

  body { overflow-x: hidden; }

  @keyframes petalFall {
    0%   { transform: translateY(-60px) rotate(0deg) translateX(0); opacity: 1; }
    40%  { transform: translateY(40vh) rotate(120deg) translateX(30px); }
    70%  { transform: translateY(70vh) rotate(200deg) translateX(-20px); }
    100% { transform: translateY(110vh) rotate(360deg) translateX(15px); opacity: 0; }
  }
  @keyframes envFloat {
    0%, 100% { transform: translateY(0px) rotate(-1.2deg); }
    33%       { transform: translateY(-14px) rotate(0.8deg); }
    66%       { transform: translateY(-6px) rotate(-0.4deg); }
  }
  @keyframes envWiggle {
    0%,100% { transform: rotate(0deg) translateY(0); }
    20%     { transform: rotate(-5deg) translateY(-2px); }
    40%     { transform: rotate(5deg) translateY(2px); }
    60%     { transform: rotate(-3.5deg) translateY(-1px); }
    80%     { transform: rotate(3.5deg) translateY(1px); }
  }
  @keyframes flapOpen {
    0%   { transform: rotateX(0deg); }
    100% { transform: rotateX(-185deg); }
  }
  @keyframes screenFadeOut {
    0%   { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(1.06); }
  }
  @keyframes screenFadeIn {
    0%   { opacity: 0; transform: scale(0.97) translateY(8px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.45; transform: scale(1) translateY(0); }
    50%       { opacity: 1;   transform: scale(1.05) translateY(-2px); }
  }
  @keyframes confettiBurst {
    0%   { transform: translate(0,0) rotate(0deg) scale(1); opacity: 1; }
    80%  { opacity: 0.9; }
    100% { transform: translate(var(--cx), var(--cy)) rotate(var(--cr)) scale(0.3); opacity: 0; }
  }
  @keyframes heartFloat {
    0%   { transform: translateY(0) scale(1) rotate(var(--hr)); opacity: 1; }
    100% { transform: translateY(-140px) scale(0.4) rotate(var(--hr2)); opacity: 0; }
  }
  @keyframes sparkleRadiate {
    0%   { transform: translate(0,0) scale(1); opacity: 1; }
    100% { transform: translate(var(--sx), var(--sy)) scale(0); opacity: 0; }
  }
  @keyframes giftFloat0 {
    0%, 100% { transform: rotate(var(--gr)) translateY(0px); }
    40%       { transform: rotate(var(--gr)) translateY(-12px); }
    70%       { transform: rotate(var(--gr)) translateY(-5px); }
  }
  @keyframes giftFloat1 {
    0%, 100% { transform: rotate(var(--gr)) translateY(0px); }
    30%       { transform: rotate(var(--gr)) translateY(-9px); }
    65%       { transform: rotate(var(--gr)) translateY(-15px); }
  }
  @keyframes giftFloat2 {
    0%, 100% { transform: rotate(var(--gr)) translateY(0px); }
    50%       { transform: rotate(var(--gr)) translateY(-11px); }
  }
  @keyframes giftFloat3 {
    0%, 100% { transform: rotate(var(--gr)) translateY(0px); }
    25%       { transform: rotate(var(--gr)) translateY(-7px); }
    75%       { transform: rotate(var(--gr)) translateY(-13px); }
  }
  @keyframes giftShimmer {
    0%, 100% { filter: brightness(1) drop-shadow(0 10px 28px rgba(136,14,79,0.18)); }
    50%       { filter: brightness(1.06) drop-shadow(0 18px 44px rgba(136,14,79,0.30)); }
  }
  @keyframes giftSquish {
    0%   { transform: rotate(var(--gr)) scale(1); }
    20%  { transform: rotate(var(--gr)) scale(1.11, 0.89); }
    50%  { transform: rotate(var(--gr)) scale(0.93, 1.07); }
    75%  { transform: rotate(var(--gr)) scale(1.04, 0.98); }
    100% { transform: rotate(var(--gr)) scale(1); }
  }
  @keyframes lidFlip {
    0%   { transform: rotateX(0deg); }
    100% { transform: rotateX(-165deg); }
  }
  @keyframes popScale {
    0%   { transform: rotate(var(--gr)) scale(0.4); opacity: 0; }
    55%  { transform: rotate(var(--gr)) scale(1.08); opacity: 1; }
    78%  { transform: rotate(var(--gr)) scale(0.97); }
    100% { transform: rotate(var(--gr)) scale(1); opacity: 1; }
  }
  @keyframes tulipSway {
    0%, 100% { transform: rotate(-3deg); transform-origin: bottom center; }
    50%       { transform: rotate(3deg);  transform-origin: bottom center; }
  }
  @keyframes tulipPopIn {
    0%   { transform: scale(0) translateY(20px); opacity: 0; }
    70%  { transform: scale(1.1) translateY(-4px); opacity: 1; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
  }
  @keyframes celebrationBounce {
    0%, 100% { transform: translateY(0); }
    30%       { transform: translateY(-14px); }
    60%       { transform: translateY(-5px); }
  }
  @keyframes ripple {
    0%   { transform: scale(0); opacity: 0.5; }
    100% { transform: scale(4); opacity: 0; }
  }
  @keyframes starTwinkle {
    0%, 100% { opacity: 0.15; transform: scale(0.7); }
    50%       { opacity: 0.9;  transform: scale(1.3); }
  }
  @keyframes gradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .petal-layer {
    position: fixed; inset: 0;
    pointer-events: none; z-index: 0; overflow: hidden;
  }
  .petal {
    position: absolute; top: -60px;
    animation: petalFall linear infinite;
    will-change: transform;
  }

  /* ── SCREEN 1 ── */
  .env-screen {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: linear-gradient(135deg, #fff0f6 0%, #fce4ec 40%, #f8bbd0 70%, #fff0f6 100%);
    background-size: 300% 300%;
    animation: gradientShift 8s ease infinite, screenFadeIn 0.9s ease forwards;
    position: relative; z-index: 1;
  }
  .env-screen.fading-out { animation: screenFadeOut 0.85s ease forwards !important; }

  .env-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 6vw, 2.8rem);
    color: var(--deep); letter-spacing: 0.03em;
    text-align: center; margin-bottom: 2.8rem;
    font-style: italic;
    text-shadow: 0 3px 14px rgba(136,14,79,0.13); line-height: 1.2;
  }
  .env-title span {
    display: block; font-size: 0.52em; font-style: normal;
    font-weight: 300; letter-spacing: 0.24em; color: var(--mid);
    text-transform: uppercase; font-family: 'Lato', sans-serif;
    margin-bottom: 0.35em; opacity: 0.8;
  }
  .env-wrapper {
    position: relative; width: clamp(230px, 70vw, 350px);
    cursor: pointer; perspective: 1000px; z-index: 2;
  }
  .env-wrapper.floating {
    animation: envFloat 4s ease-in-out infinite, envWiggle 2.4s ease-in-out 1.6s 1;
  }
  .envelope { width: 100%; position: relative; filter: drop-shadow(0 20px 44px rgba(136,14,79,0.24)); }
  .env-body {
    width: 100%; padding-top: 62%;
    background: linear-gradient(155deg, #fce4ec 0%, #f8bbd0 100%);
    border-radius: 5px 5px 9px 9px; position: relative; overflow: hidden;
  }
  .env-body::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 55%);
    pointer-events: none;
  }
  .env-flap-wrap {
    position: absolute; top: 0; left: 0; right: 0;
    height: 54%; perspective: 1000px;
  }
  .env-flap {
    width: 100%; height: 100%;
    transform-origin: top center; transform-style: preserve-3d;
  }
  .env-flap.open { animation: flapOpen 0.65s cubic-bezier(0.4,0,0.2,1) forwards; }
  .env-flap svg { width: 100%; height: 100%; display: block; }

  .tap-hint {
    margin-top: 2.4rem; font-family: 'Lato', sans-serif;
    font-size: 0.72rem; letter-spacing: 0.24em; text-transform: uppercase;
    color: var(--mid); animation: pulse 2.2s ease-in-out infinite;
    display: flex; align-items: center; gap: 8px; opacity: 0.75;
  }
  .tap-hint::before, .tap-hint::after { content: '✦'; font-size: 0.55em; opacity: 0.55; }

  /* ── SCREEN 2 ── */
  .main-screen {
    min-height: 100vh;
    background: linear-gradient(180deg, #fff0f6 0%, #fce4ec 28%, #fff9f2 58%, #fff0f6 100%);
    animation: screenFadeIn 1s ease forwards;
    position: relative; z-index: 1; padding-bottom: 90px;
  }
  .main-header { text-align: center; padding: 0 16px 8px; position: relative; }
  .tulip-row-header {
    display: flex; justify-content: center; align-items: flex-end;
    gap: clamp(3px, 2vw, 12px); padding-top: 20px; overflow: visible;
  }
  .tulip-item {
    animation: tulipPopIn 0.65s cubic-bezier(0.34,1.56,0.64,1) both;
    animation-delay: var(--td, 0s);
  }
  .tulip-item svg {
    display: block; animation: tulipSway 3.8s ease-in-out infinite;
    animation-delay: var(--ts, 0s); transform-origin: bottom center;
  }
  .header-badge {
    display: inline-block;
    background: linear-gradient(135deg, var(--mid), var(--vivid));
    color: white; font-family: 'Lato', sans-serif;
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.22em;
    text-transform: uppercase; padding: 5px 16px; border-radius: 100px;
    margin-bottom: 9px; box-shadow: 0 4px 16px rgba(233,30,140,0.28);
  }
  .main-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.9rem, 8vw, 3.6rem);
    color: var(--deep); line-height: 1.1; font-style: italic;
    text-shadow: 0 3px 18px rgba(136,14,79,0.11); margin-bottom: 5px;
  }
  .main-subtitle {
    font-family: 'Lato', sans-serif;
    font-size: clamp(0.75rem, 2.8vw, 0.95rem);
    font-weight: 300; color: var(--mid); letter-spacing: 0.1em;
    margin-bottom: 4px; opacity: 0.8;
  }
  .divider { display: flex; align-items: center; justify-content: center; gap: 10px; margin: 12px auto; }
  .divider::before, .divider::after {
    content: ''; flex: 1; max-width: 70px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--mid), transparent); opacity: 0.35;
  }
  .gifts-intro {
    font-family: 'Lato', sans-serif; font-size: 0.82rem;
    color: var(--mid); text-align: center; padding: 0 28px 20px;
    letter-spacing: 0.05em; opacity: 0.7;
  }

  /* ── GIFTS — gap spacing, no negative margins ── */
  .gifts-column {
    display: flex; flex-direction: column;
    gap: 28px;
    padding: 10px 0 20px; position: relative;
  }

  .gift-outer {
    cursor: pointer; position: relative; will-change: transform, filter;
  }
  .gift-outer.f0 { animation: giftFloat0 var(--gf-dur) ease-in-out var(--gf-del) infinite, giftShimmer var(--gs-dur) ease-in-out var(--gs-del) infinite; }
  .gift-outer.f1 { animation: giftFloat1 var(--gf-dur) ease-in-out var(--gf-del) infinite, giftShimmer var(--gs-dur) ease-in-out var(--gs-del) infinite; }
  .gift-outer.f2 { animation: giftFloat2 var(--gf-dur) ease-in-out var(--gf-del) infinite, giftShimmer var(--gs-dur) ease-in-out var(--gs-del) infinite; }
  .gift-outer.f3 { animation: giftFloat3 var(--gf-dur) ease-in-out var(--gf-del) infinite, giftShimmer var(--gs-dur) ease-in-out var(--gs-del) infinite; }
  .gift-outer.squishing { animation: giftSquish 0.42s ease forwards !important; }

  .gift-box {
    width: 100%; border-radius: 14px; overflow: hidden;
    aspect-ratio: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: flex-end;
    position: relative; box-shadow: 0 8px 28px rgba(136,14,79,0.15);
  }
  .gift-lid {
    position: absolute; top: 0; left: 0; right: 0; height: 33%;
    transform-origin: top center; perspective: 500px; z-index: 4;
    border-radius: 14px 14px 0 0; overflow: hidden;
  }
  .gift-lid.flipping { animation: lidFlip 0.52s cubic-bezier(0.34,1.1,0.64,1) forwards; }
  .gift-ribbon-v {
    position: absolute; left: 50%; top: 0; bottom: 0;
    width: 13%; transform: translateX(-50%);
    z-index: 3; border-radius: 2px; opacity: 0.82;
  }
  .gift-ribbon-h { position: absolute; left: 0; right: 0; z-index: 3; opacity: 0.82; }
  .gift-label {
    position: absolute; bottom: 0; left: 0; right: 0; z-index: 5;
    text-align: center; padding: 6px 4px 10px;
    background: linear-gradient(0deg, rgba(0,0,0,0.26), transparent);
  }
  .gift-theme {
    font-family: 'Playfair Display', serif;
    font-size: clamp(0.7rem, 3.5vw, 0.95rem);
    font-style: italic; color: rgba(255,255,255,0.93); letter-spacing: 0.04em;
  }
  .gift-emoji {
    font-size: clamp(1.3rem, 6vw, 1.8rem); display: block; margin-bottom: 2px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.22));
  }
  .gift-bow {
    position: absolute; top: -5px; left: 50%;
    transform: translateX(-50%); z-index: 6; width: 60%; pointer-events: none;
  }

  /* ── OPENED CARD ── */
  .gift-card {
    width: 100%; border-radius: 14px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: flex-start;
    padding: 13px 10px 14px;
    background: linear-gradient(160deg, #fff9f2 0%, #fce4ec 100%);
    box-shadow: 0 14px 42px rgba(136,14,79,0.19);
    animation: popScale 0.52s cubic-bezier(0.34,1.56,0.64,1) forwards;
    overflow: hidden; position: relative;
  }
  .gift-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.48) 0%, transparent 50%);
    pointer-events: none;
  }
  .card-photo-area {
    width: 100%; aspect-ratio: 1;
    border-radius: 8px; overflow: hidden;
    margin-bottom: 10px; flex-shrink: 0;
  }
  .card-photo-area img {
    width: 100%; height: 100%; object-fit: contain; border-radius: 8px;
  }
  .card-theme-tag {
    font-family: 'Lato', sans-serif; font-size: 0.52rem;
    font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--vivid); margin-bottom: 6px;
  }
  .card-message {
    font-family: 'Playfair Display', serif; font-style: italic;
    font-size: clamp(0.58rem, 2.4vw, 0.76rem);
    color: var(--deep); text-align: center;
    line-height: 1.55; padding: 0 4px; flex-shrink: 0;
  }

  /* ── PARTICLES ── */
  .particle-canvas { position: fixed; inset: 0; pointer-events: none; z-index: 999; overflow: hidden; }
  .confetti-piece {
    position: absolute; width: 9px; height: 9px;
    animation: confettiBurst 0.95s cubic-bezier(0.1,0.8,0.3,1) forwards;
    animation-delay: var(--cd, 0s);
  }
  .heart-particle {
    position: absolute;
    animation: heartFloat 1.2s ease forwards;
    animation-delay: var(--hd, 0s); pointer-events: none;
  }
  .sparkle-particle {
    position: absolute; border-radius: 50%;
    animation: sparkleRadiate 0.85s ease forwards;
    animation-delay: var(--sd, 0s);
  }

  /* ── CELEBRATION ── */
  .celebration-footer {
    text-align: center; padding: 40px 20px 52px;
    animation: screenFadeIn 0.8s ease forwards;
  }
  .celebration-footer h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.3rem, 5.5vw, 2rem);
    color: var(--deep); font-style: italic; margin-bottom: 6px;
    animation: celebrationBounce 1.4s ease infinite;
  }
  .celebration-footer p {
    font-family: 'Lato', sans-serif; font-size: 0.8rem;
    color: var(--mid); letter-spacing: 0.1em; margin-bottom: 22px; font-weight: 300;
  }
  .tulip-row-footer { display: flex; justify-content: center; align-items: flex-end; gap: 5px; }

  .ripple-el {
    position: absolute; border-radius: 50%;
    background: rgba(255,255,255,0.42); pointer-events: none;
    animation: ripple 0.75s ease forwards; z-index: 20;
  }
  .star {
    position: absolute; color: var(--gold); font-size: 0.85rem;
    animation: starTwinkle ease-in-out infinite;
    animation-duration: var(--st-dur, 2s); animation-delay: var(--st-del, 0s);
    pointer-events: none;
  }
`;

/* ─── GIFT DATA ─────────────────────────────────────────── */

const GIFTS = [
  {
    id: 0,
    colors: {
      body: ["#e91e8c", "#c2185b"],
      lid: ["#880e4f", "#ad1457"],
      ribbon: "#f8bbd0",
    },
    message:
      "Biskan dungol kag pasaway kami kis-a, palangga mo gyapon kami pirmi",
    photo: "/pic1.jpg",
  },
  {
    id: 1,
    colors: {
      body: ["#f06292", "#e91e8c"],
      lid: ["#c2185b", "#880e4f"],
      ribbon: "#fff9c4",
    },
    message:
      "Biskan dako na kami subong, wala gid naglain ang pag atipan mo sa amon",
    photo: "/pic2.jpg",
  },
  {
    id: 2,
    colors: {
      body: ["#7cb342", "#6ab04c"],
      lid: ["#558b2f", "#4a8a30"],
      ribbon: "#f8bbd0",
    },
    message:
      "Mag inano pa ang kalibutan, ikaw gid ang pinakasaligan namon sa tanan nga bagay",
    photo: "/pic3.jpg",
  },
  {
    id: 3,
    colors: {
      body: ["#f48fb1", "#f06292"],
      lid: ["#e91e8c", "#c2185b"],
      ribbon: "#fff9c4",
    },
    message:
      "Sa katapusan sang adlaw, ikaw lang gid gyapon ang amon ulian Ma",
    photo: "/pic4.jpg",
  },
];

const LAYOUT = [
  {
    side: "left",
    ml: "5%",
    mr: "auto",
    w: "56%",
    rot: "-3.8deg",
    fi: 0,
    gfDur: "3.3s",
    gsDur: "2.7s",
    gfDel: "0s",
    gsDel: "0.3s",
  },
  {
    side: "right",
    ml: "auto",
    mr: "6%",
    w: "50%",
    rot: "4.2deg",
    fi: 1,
    gfDur: "4.1s",
    gsDur: "3.2s",
    gfDel: "0.5s",
    gsDel: "1.0s",
  },
  {
    side: "left",
    ml: "14%",
    mr: "auto",
    w: "52%",
    rot: "-1.8deg",
    fi: 2,
    gfDur: "3.7s",
    gsDur: "2.9s",
    gfDel: "0.9s",
    gsDel: "0.5s",
  },
  {
    side: "right",
    ml: "auto",
    mr: "3%",
    w: "58%",
    rot: "5.8deg",
    fi: 3,
    gfDur: "3.0s",
    gsDur: "3.5s",
    gfDel: "0.2s",
    gsDel: "1.3s",
  },
];

/* ─── SVG COMPONENTS ────────────────────────────────────── */

function Tulip({
  scale = 1,
  colorHead = "#e91e8c",
  colorLeaf = "#6ab04c",
  colorStem = "#6ab04c",
}) {
  const s = scale;
  return (
    <svg width={40 * s} height={80 * s} viewBox="0 0 40 80" fill="none">
      <path
        d="M20 78 Q18 60 20 46"
        stroke={colorStem}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M20 62 Q8 56 6 44 Q14 50 20 52" fill={colorLeaf} opacity="0.9" />
      <path
        d="M20 58 Q32 52 34 40 Q26 46 20 48"
        fill={colorLeaf}
        opacity="0.85"
      />
      <ellipse
        cx="20"
        cy="26"
        rx="7"
        ry="13"
        fill={colorHead}
        opacity="0.52"
        transform="rotate(-10 20 26)"
      />
      <ellipse
        cx="20"
        cy="26"
        rx="7"
        ry="13"
        fill={colorHead}
        opacity="0.52"
        transform="rotate(10 20 26)"
      />
      <ellipse cx="20" cy="24" rx="6" ry="12" fill={colorHead} opacity="0.88" />
      <ellipse
        cx="14"
        cy="26"
        rx="5.5"
        ry="11"
        fill={colorHead}
        opacity="0.8"
        transform="rotate(-14 14 26)"
      />
      <ellipse
        cx="26"
        cy="26"
        rx="5.5"
        ry="11"
        fill={colorHead}
        opacity="0.8"
        transform="rotate(14 26 26)"
      />
      <ellipse
        cx="18"
        cy="20"
        rx="2.5"
        ry="5"
        fill="rgba(255,255,255,0.27)"
        transform="rotate(-6 18 20)"
      />
    </svg>
  );
}

function BowSVG({ color }) {
  return (
    <svg viewBox="0 0 80 44" fill="none">
      <path
        d="M38 22 C28 10 10 6 8 16 C6 26 24 28 38 22Z"
        fill={color}
        opacity="0.92"
      />
      <path
        d="M38 22 C28 18 12 22 14 28 C16 34 32 30 38 22Z"
        fill={color}
        opacity="0.68"
      />
      <path
        d="M42 22 C52 10 70 6 72 16 C74 26 56 28 42 22Z"
        fill={color}
        opacity="0.92"
      />
      <path
        d="M42 22 C52 18 68 22 66 28 C64 34 48 30 42 22Z"
        fill={color}
        opacity="0.68"
      />
      <ellipse cx="40" cy="22" rx="6" ry="5" fill={color} />
      <ellipse cx="40" cy="22" rx="3" ry="2.5" fill="rgba(255,255,255,0.38)" />
      <path
        d="M36 26 Q32 38 28 42"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M44 26 Q48 38 52 42"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FlapSVG() {
  return (
    <svg viewBox="0 0 350 160" preserveAspectRatio="none">
      <rect x="0" y="0" width="350" height="160" fill="url(#fb)" />
      <path d="M0 0 L175 115 L350 0 Z" fill="url(#ft)" />
      <defs>
        <linearGradient id="fb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fce4ec" />
          <stop offset="100%" stopColor="#f8bbd0" />
        </linearGradient>
        <linearGradient id="ft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f06292" />
          <stop offset="100%" stopColor="#e91e8c" stopOpacity="0.88" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ParticleCanvas({ particles }) {
  if (!particles.length) return null;
  return (
    <div className="particle-canvas">
      {particles.map((p) => {
        if (p.type === "confetti")
          return (
            <div
              key={p.id}
              className="confetti-piece"
              style={{
                left: p.x,
                top: p.y,
                background: p.color,
                borderRadius: p.round ? "50%" : "3px",
                "--cx": p.cx,
                "--cy": p.cy,
                "--cr": p.cr,
                "--cd": p.delay,
                transform: `rotate(${p.initRot})`,
              }}
            />
          );
        if (p.type === "heart")
          return (
            <div
              key={p.id}
              className="heart-particle"
              style={{
                left: p.x,
                top: p.y,
                "--hd": p.delay,
                "--hr": p.rot,
                "--hr2": p.rot2,
                fontSize: p.size,
              }}
            >
              ❤️
            </div>
          );
        if (p.type === "sparkle")
          return (
            <div
              key={p.id}
              className="sparkle-particle"
              style={{
                left: p.x,
                top: p.y,
                background: p.color,
                "--sx": p.sx,
                "--sy": p.sy,
                "--sd": p.delay,
                width: p.size,
                height: p.size,
              }}
            />
          );
        return null;
      })}
    </div>
  );
}

const STARS = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  left: `${8 + ((i * 10.3) % 84)}%`,
  top: `${6 + ((i * 12.7) % 88)}%`,
  dur: `${1.6 + ((i * 0.35) % 1.8)}s`,
  del: `${(i * 0.31) % 1.4}s`,
}));

const PETALS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  emoji: ["🌸", "🌺", "🌷", "🌹", "💮"][i % 5],
  left: `${(i * 6.2 + 3) % 94}%`,
  delay: `${(i * 1.4) % 9}s`,
  duration: `${6 + ((i * 0.9) % 5)}s`,
  size: `${0.85 + ((i * 0.12) % 0.65)}rem`,
}));

/* ─── APP ───────────────────────────────────────────────── */

export default function MothersDay() {
  const [screen, setScreen] = useState("envelope");
  const [envState, setEnvState] = useState("idle");
  const [fading, setFading] = useState(false);
  const [openedGifts, setOpenedGifts] = useState({});
  const [particles, setParticles] = useState([]);
  const pidRef = useRef(0);

  const handleEnvelopeTap = useCallback(() => {
    if (envState !== "idle") return;
    setEnvState("opening");
    setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setScreen("main");
        setFading(false);
      }, 860);
    }, 480);
  }, [envState]);

  const burstParticles = useCallback((rect) => {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const np = [];
    const cc = [
      "#e91e8c",
      "#c2185b",
      "#f9a825",
      "#6ab04c",
      "#880e4f",
      "#fff176",
      "#f48fb1",
    ];
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2,
        d = 65 + Math.random() * 95;
      np.push({
        id: `c-${pidRef.current++}`,
        type: "confetti",
        x: cx - 4,
        y: cy - 4,
        color: cc[i % cc.length],
        round: Math.random() > 0.62,
        cx: `${Math.cos(a) * d}px`,
        cy: `${Math.sin(a) * d}px`,
        cr: `${(Math.random() - 0.5) * 720}deg`,
        delay: `${Math.random() * 0.2}s`,
        initRot: `${Math.random() * 360}deg`,
      });
    }
    for (let i = 0; i < 9; i++) {
      np.push({
        id: `h-${pidRef.current++}`,
        type: "heart",
        x: cx - 14 + (Math.random() - 0.5) * rect.width * 0.65,
        y: cy - 14,
        delay: `${Math.random() * 0.3}s`,
        rot: `${(Math.random() - 0.5) * 22}deg`,
        rot2: `${(Math.random() - 0.5) * 38}deg`,
        size: `${0.85 + Math.random() * 0.85}rem`,
      });
    }
    const sc = ["#f9a825", "#e91e8c", "#fff176", "#c2185b", "#f48fb1"];
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2,
        d = 45 + Math.random() * 65;
      np.push({
        id: `s-${pidRef.current++}`,
        type: "sparkle",
        x: cx - 3,
        y: cy - 3,
        color: sc[i % sc.length],
        sx: `${Math.cos(a) * d}px`,
        sy: `${Math.sin(a) * d}px`,
        delay: `${Math.random() * 0.14}s`,
        size: `${4 + Math.random() * 6}px`,
      });
    }
    setParticles((p) => [...p, ...np]);
    setTimeout(
      () =>
        setParticles((p) => p.filter((x) => !np.find((n) => n.id === x.id))),
      1700
    );
  }, []);

  const createRipple = useCallback((e, el) => {
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.3;
    const x = (e.clientX ?? rect.left + rect.width / 2) - rect.left - size / 2;
    const y = (e.clientY ?? rect.top + rect.height / 2) - rect.top - size / 2;
    const r = document.createElement("div");
    r.className = "ripple-el";
    r.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
    el.appendChild(r);
    setTimeout(() => r.remove(), 800);
  }, []);

  const handleGiftTap = useCallback(
    (e, giftId) => {
      if (openedGifts[giftId]) return;
      const el = e.currentTarget;
      createRipple(e, el);
      el.classList.add("squishing");
      el.querySelector(".gift-lid")?.classList.add("flipping");
      setTimeout(() => el.classList.remove("squishing"), 430);
      const rect = el.getBoundingClientRect();
      setTimeout(() => {
        burstParticles(rect);
        setOpenedGifts((p) => ({ ...p, [giftId]: true }));
      }, 300);
    },
    [openedGifts, burstParticles, createRipple]
  );

  const allOpened = GIFTS.every((g) => openedGifts[g.id]);

  const headerTulips = [
    { scale: 0.68, colorHead: "#c2185b", td: "0.1s", ts: "0s" },
    { scale: 0.84, colorHead: "#e91e8c", td: "0.22s", ts: "0.4s" },
    { scale: 1.08, colorHead: "#880e4f", td: "0.05s", ts: "0.9s" },
    { scale: 0.91, colorHead: "#f06292", td: "0.28s", ts: "0.2s" },
    { scale: 0.7, colorHead: "#e91e8c", td: "0.14s", ts: "0.6s" },
    { scale: 0.98, colorHead: "#c2185b", td: "0.19s", ts: "1.1s" },
    { scale: 0.76, colorHead: "#880e4f", td: "0.33s", ts: "0.35s" },
  ];

  return (
    <>
      <style>{CSS}</style>

      <div className="petal-layer">
        {PETALS.map((p) => (
          <div
            key={p.id}
            className="petal"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              fontSize: p.size,
            }}
          >
            {p.emoji}
          </div>
        ))}
      </div>

      <ParticleCanvas particles={particles} />

      {/* ── ENVELOPE SCREEN ── */}
      {screen === "envelope" && (
        <div className={`env-screen${fading ? " fading-out" : ""}`}>
          {STARS.map((s) => (
            <div
              key={s.id}
              className="star"
              style={{
                left: s.left,
                top: s.top,
                "--st-dur": s.dur,
                "--st-del": s.del,
              }}
            >
              ✦
            </div>
          ))}
          <div
            className={`env-wrapper${envState === "idle" ? " floating" : ""}`}
            onClick={handleEnvelopeTap}
          >
            <div className="envelope">
              <div className="env-body">
                <svg
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                  }}
                  viewBox="0 0 350 218"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 218 L175 110 L350 218 Z"
                    fill="#f48fb1"
                    opacity="0.32"
                  />
                  <path
                    d="M0 0 L175 110"
                    stroke="#f48fb1"
                    strokeWidth="1.2"
                    opacity="0.28"
                  />
                  <path
                    d="M350 0 L175 110"
                    stroke="#f48fb1"
                    strokeWidth="1.2"
                    opacity="0.28"
                  />
                </svg>
              </div>
              <div className="env-flap-wrap">
                <div
                  className={`env-flap${envState === "opening" ? " open" : ""}`}
                >
                  <FlapSVG />
                </div>
              </div>
            </div>
          </div>
          {envState === "idle" && <p className="tap-hint">pinduta ang envelope</p>}
        </div>
      )}

      {/* ── MAIN SCREEN ── */}
      {screen === "main" && (
        <div className="main-screen">
          {STARS.slice(0, 5).map((s) => (
            <div
              key={s.id}
              className="star"
              style={{
                left: s.left,
                top: s.top,
                "--st-dur": s.dur,
                "--st-del": s.del,
              }}
            >
              ✦
            </div>
          ))}

          <div className="main-header">
            <div className="tulip-row-header">
              {headerTulips.map((t, i) => (
                <div
                  key={i}
                  className="tulip-item"
                  style={{ "--td": t.td, "--ts": t.ts }}
                >
                  <Tulip scale={t.scale} colorHead={t.colorHead} />
                </div>
              ))}
            </div>
            <div className="header-badge">May 10, 2026</div>
            <h1 className="main-title">Happy Mother's Day, Janet Tocong</h1>
            <div className="divider">🌸</div>
          </div>

          <p className="gifts-intro">
            Apat ka little gifts — pinduta para makita
          </p>

          <div className="gifts-column">
            {GIFTS.map((gift) => {
              const L = LAYOUT[gift.id];
              const opened = !!openedGifts[gift.id];

              return (
                <div
                  key={gift.id}
                  style={{
                    display: "flex",
                    justifyContent:
                      L.side === "left" ? "flex-start" : "flex-end",
                    paddingLeft: L.side === "left" ? L.ml : "0",
                    paddingRight: L.side === "right" ? L.mr : "0",
                  }}
                >
                  {opened ? (
                    <div
                      className="gift-card"
                      style={{ width: L.w, "--gr": L.rot }}
                    >
                      <div className="card-theme-tag">{gift.theme}</div>
                      <div className="card-photo-area">
                        <img src={gift.photo} alt={gift.theme} />
                      </div>
                      <p className="card-message">{gift.message}</p>
                    </div>
                  ) : (
                    <div
                      className={`gift-outer f${L.fi}`}
                      style={{
                        width: L.w,
                        "--gr": L.rot,
                        "--gf-dur": L.gfDur,
                        "--gs-dur": L.gsDur,
                        "--gf-del": L.gfDel,
                        "--gs-del": L.gsDel,
                        transform: `rotate(${L.rot})`,
                      }}
                      onClick={(e) => handleGiftTap(e, gift.id)}
                    >
                      <div
                        className="gift-box"
                        style={{
                          background: `linear-gradient(155deg,${gift.colors.body[0]},${gift.colors.body[1]})`,
                        }}
                      >
                        <div
                          className="gift-ribbon-h"
                          style={{
                            background: gift.colors.ribbon,
                            top: "30%",
                            bottom: "60%",
                          }}
                        />
                        <div
                          className="gift-ribbon-v"
                          style={{ background: gift.colors.ribbon }}
                        />
                        <div
                          className="gift-lid"
                          style={{
                            background: `linear-gradient(155deg,${gift.colors.lid[0]},${gift.colors.lid[1]})`,
                          }}
                        >
                          <div
                            className="gift-ribbon-v"
                            style={{
                              background: gift.colors.ribbon,
                              position: "absolute",
                              left: "50%",
                              transform: "translateX(-50%)",
                              top: 0,
                              bottom: 0,
                              width: "15%",
                            }}
                          />
                        </div>
                        <div className="gift-bow">
                          <BowSVG color={gift.colors.ribbon} />
                        </div>
                        <div className="gift-label">
                          <span className="gift-emoji">{gift.emoji}</span>
                          <span className="gift-theme">{gift.theme}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {allOpened && (
            <div className="celebration-footer">
              <h2>Palangga kagid namon ma 🌷</h2>
              <p>Salamat nga permi ka ara para sa amon, sa tanan nga oras.</p>
              <div className="tulip-row-footer">
                {[0.68, 0.92, 1.08, 0.88, 0.73, 0.98, 0.79, 0.86, 0.7].map(
                  (sc, i) => (
                    <div
                      key={i}
                      className="tulip-item"
                      style={{ "--td": `${i * 0.07}s`, "--ts": `${i * 0.21}s` }}
                    >
                      <Tulip
                        scale={sc}
                        colorHead={
                          ["#e91e8c", "#c2185b", "#880e4f", "#f06292"][i % 4]
                        }
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
