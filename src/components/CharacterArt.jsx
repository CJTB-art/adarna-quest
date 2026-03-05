// ============================================================
//  CHARACTER ART — Hand-crafted SVG portraits
//  Each character is a self-contained React component.
//  Edit colors/shapes here to customize the look.
// ============================================================

// ── Shared face helper ───────────────────────────────────
function Face({ x = 50, y = 38, r = 18, skin = '#F5C89A', eyeY = 35 }) {
  return (
    <g>
      {/* Head */}
      <circle cx={x} cy={y} r={r} fill={skin} />
      {/* Eyes */}
      <circle cx={x - 7} cy={eyeY} r={2.5} fill="#2d1a0e" />
      <circle cx={x + 7} cy={eyeY} r={2.5} fill="#2d1a0e" />
      {/* Eye shine */}
      <circle cx={x - 6} cy={eyeY - 1} r={0.9} fill="white" />
      <circle cx={x + 8} cy={eyeY - 1} r={0.9} fill="white" />
      {/* Smile */}
      <path d={`M ${x-6} ${eyeY+9} Q ${x} ${eyeY+14} ${x+6} ${eyeY+9}`}
        fill="none" stroke="#b05a2a" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  )
}

// ── DON JUAN — young prince, blue tunic, crown ───────────
export function DonJuanArt({ size = 100 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Background glow */}
      <circle cx="50" cy="50" r="48" fill="url(#djBg)" opacity="0.4" />
      <defs>
        <radialGradient id="djBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3b0d6b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Body — royal blue tunic */}
      <path d="M 28 95 L 28 58 Q 50 65 72 58 L 72 95 Z" fill="#1a4fa8" />
      {/* Tunic detail */}
      <path d="M 50 65 L 50 95" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="3,3" />
      <path d="M 35 70 L 65 70" stroke="#FFD700" strokeWidth="1" opacity="0.5" />

      {/* Cape */}
      <path d="M 28 60 Q 15 75 18 95 L 28 95 Z" fill="#0d2d6b" />
      <path d="M 72 60 Q 85 75 82 95 L 72 95 Z" fill="#0d2d6b" />

      {/* Neck */}
      <rect x="44" y="53" width="12" height="8" rx="4" fill="#F5C89A" />

      {/* Face */}
      <Face x={50} y={38} r={18} skin="#F5C89A" eyeY={35} />

      {/* Hair — dark brown */}
      <path d="M 32 35 Q 33 18 50 16 Q 67 18 68 35 Q 65 25 50 23 Q 35 25 32 35 Z" fill="#3d1f00" />

      {/* Crown */}
      <path d="M 35 22 L 35 14 L 41 19 L 50 12 L 59 19 L 65 14 L 65 22 Z" fill="#FFD700" />
      <path d="M 35 22 L 65 22" stroke="#FFA500" strokeWidth="1.5" />
      {/* Crown gems */}
      <circle cx="50" cy="14" r="2.5" fill="#ff4444" />
      <circle cx="38" cy="17" r="1.8" fill="#00c9a7" />
      <circle cx="62" cy="17" r="1.8" fill="#00c9a7" />

      {/* Sword hilt */}
      <rect x="68" y="72" width="3" height="18" rx="1.5" fill="#8B6914" />
      <rect x="64" y="72" width="11" height="3" rx="1.5" fill="#FFD700" />
      <circle cx="69.5" cy="90" r="2.5" fill="#FFD700" />
    </svg>
  )
}

// ── DON PEDRO — eldest prince, red armor, stern look ────
export function DonPedroArt({ size = 100 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="url(#dpBg)" opacity="0.35" />
      <defs>
        <radialGradient id="dpBg">
          <stop offset="0%" stopColor="#cc2222" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1a0a2e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Body — dark red armor */}
      <path d="M 26 95 L 28 56 Q 50 64 72 56 L 74 95 Z" fill="#8b0000" />
      {/* Armor plates */}
      <path d="M 35 62 Q 50 68 65 62 L 65 75 Q 50 80 35 75 Z" fill="#a01010" stroke="#FFD700" strokeWidth="0.8" />
      <path d="M 37 77 Q 50 82 63 77 L 63 88 Q 50 92 37 88 Z" fill="#8b0000" stroke="#FFD700" strokeWidth="0.8" />
      {/* Shoulder guards */}
      <ellipse cx="27" cy="60" rx="9" ry="6" fill="#6b0000" stroke="#FFD700" strokeWidth="0.8" />
      <ellipse cx="73" cy="60" rx="9" ry="6" fill="#6b0000" stroke="#FFD700" strokeWidth="0.8" />

      {/* Neck */}
      <rect x="44" y="53" width="12" height="8" rx="4" fill="#e8a87c" />

      {/* Face — slightly stern */}
      <circle cx="50" cy="38" r="18" fill="#e8a87c" />
      <circle cx="43" cy="35" r="2.5" fill="#2d1a0e" />
      <circle cx="57" cy="35" r="2.5" fill="#2d1a0e" />
      <circle cx="44" cy="34" r="0.9" fill="white" />
      <circle cx="58" cy="34" r="0.9" fill="white" />
      {/* Stern mouth */}
      <path d="M 44 46 L 56 46" stroke="#b05a2a" strokeWidth="1.5" strokeLinecap="round" />
      {/* Beard stubble */}
      <path d="M 38 44 Q 50 52 62 44" fill="#c07040" opacity="0.3" />

      {/* Hair + beard — dark */}
      <path d="M 32 35 Q 33 16 50 14 Q 67 16 68 35 Q 64 22 50 20 Q 36 22 32 35 Z" fill="#1a0a00" />
      {/* Beard */}
      <path d="M 38 48 Q 50 56 62 48 Q 60 58 50 60 Q 40 58 38 48 Z" fill="#1a0a00" />

      {/* Crown — larger for eldest */}
      <path d="M 33 21 L 33 12 L 40 18 L 50 10 L 60 18 L 67 12 L 67 21 Z" fill="#FFD700" />
      <path d="M 33 21 L 67 21" stroke="#FFA500" strokeWidth="2" />
      <circle cx="50" cy="12" r="3" fill="#cc2222" />
      <circle cx="37" cy="16" r="2" fill="#FFD700" />
      <circle cx="63" cy="16" r="2" fill="#FFD700" />
    </svg>
  )
}

// ── DON DIEGO — middle prince, green, shy look ───────────
export function DonDiegoArt({ size = 100 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="url(#ddBg)" opacity="0.35" />
      <defs>
        <radialGradient id="ddBg">
          <stop offset="0%" stopColor="#1a8a3a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1a0a2e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Body — forest green tunic */}
      <path d="M 28 95 L 28 58 Q 50 66 72 58 L 72 95 Z" fill="#1a6b2a" />
      <path d="M 50 66 L 50 95" stroke="#90EE90" strokeWidth="1" opacity="0.4" />
      {/* Belt */}
      <rect x="28" y="73" width="44" height="5" rx="2.5" fill="#5a3a10" />
      <rect x="46" y="72" width="8" height="7" rx="2" fill="#FFD700" />

      {/* Cape */}
      <path d="M 28 60 Q 16 73 20 95 L 28 95 Z" fill="#0d4a1a" />
      <path d="M 72 60 Q 84 73 80 95 L 72 95 Z" fill="#0d4a1a" />

      {/* Neck */}
      <rect x="44" y="53" width="12" height="8" rx="4" fill="#F5C89A" />

      {/* Face — younger, rounder */}
      <circle cx="50" cy="39" r="17" fill="#F5C89A" />
      <circle cx="43" cy="36" r="2.2" fill="#2d1a0e" />
      <circle cx="57" cy="36" r="2.2" fill="#2d1a0e" />
      <circle cx="44" cy="35" r="0.8" fill="white" />
      <circle cx="58" cy="35" r="0.8" fill="white" />
      {/* Shy half-smile */}
      <path d="M 45 46 Q 52 51 57 46" fill="none" stroke="#b05a2a" strokeWidth="1.5" strokeLinecap="round" />
      {/* Cheek blush */}
      <ellipse cx="40" cy="43" rx="5" ry="3" fill="#ffaaaa" opacity="0.35" />
      <ellipse cx="60" cy="43" rx="5" ry="3" fill="#ffaaaa" opacity="0.35" />

      {/* Hair — medium brown, slightly messy */}
      <path d="M 33 36 Q 34 18 50 16 Q 66 18 67 36 Q 63 23 50 21 Q 37 23 33 36 Z" fill="#4a2800" />
      {/* Messy strand */}
      <path d="M 50 16 Q 55 10 58 16" fill="none" stroke="#4a2800" strokeWidth="3" strokeLinecap="round" />

      {/* Small crown — middle prince, simpler */}
      <path d="M 36 22 L 36 15 L 43 20 L 50 13 L 57 20 L 64 15 L 64 22 Z" fill="#FFD700" />
      <path d="M 36 22 L 64 22" stroke="#FFA500" strokeWidth="1.5" />
      <circle cx="50" cy="15" r="2" fill="#7b2fbf" />
    </svg>
  )
}

// ── HARING FERNANDO — old king, elaborate crown ──────────
export function HaringFernandoArt({ size = 100 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="url(#hfBg)" opacity="0.4" />
      <defs>
        <radialGradient id="hfBg">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1a0a2e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Royal robe */}
      <path d="M 20 95 L 24 55 Q 50 65 76 55 L 80 95 Z" fill="#4a0080" />
      {/* Robe trim */}
      <path d="M 20 95 L 24 55 L 27 55 L 23 95 Z" fill="#FFD700" />
      <path d="M 80 95 L 76 55 L 73 55 L 77 95 Z" fill="#FFD700" />
      {/* Robe pattern */}
      <path d="M 30 65 Q 50 72 70 65 L 70 80 Q 50 86 30 80 Z" fill="#5a0090" stroke="#FFD700" strokeWidth="0.8" />

      {/* Ermine collar */}
      <path d="M 30 58 Q 50 66 70 58 L 68 52 Q 50 60 32 52 Z" fill="white" />
      {/* Ermine spots */}
      {[35,42,50,58,65].map((x, i) => (
        <circle key={i} cx={x} cy={57} r="1.5" fill="#333" opacity="0.5" />
      ))}

      {/* Neck */}
      <rect x="44" y="50" width="12" height="8" rx="4" fill="#d4956a" />

      {/* Face — older, wrinkled */}
      <circle cx="50" cy="37" r="17" fill="#d4956a" />
      {/* Wrinkle lines */}
      <path d="M 38 32 Q 43 30 43 33" fill="none" stroke="#b07050" strokeWidth="0.8" />
      <path d="M 57 32 Q 62 30 62 33" fill="none" stroke="#b07050" strokeWidth="0.8" />
      <path d="M 44 44 Q 50 46 56 44" fill="none" stroke="#b07050" strokeWidth="0.8" />
      {/* Eyes */}
      <circle cx="43" cy="34" r="2.5" fill="#2d1a0e" />
      <circle cx="57" cy="34" r="2.5" fill="#2d1a0e" />
      <circle cx="44" cy="33" r="0.8" fill="white" />
      <circle cx="58" cy="33" r="0.8" fill="white" />
      {/* Tired/gentle smile */}
      <path d="M 44 44 Q 50 49 56 44" fill="none" stroke="#8b4513" strokeWidth="1.5" strokeLinecap="round" />
      {/* White beard */}
      <path d="M 37 46 Q 50 58 63 46 Q 60 60 50 63 Q 40 60 37 46 Z" fill="white" />
      {/* White hair / sideburns */}
      <path d="M 33 37 Q 34 16 50 14 Q 66 16 67 37 Q 62 22 50 20 Q 38 22 33 37 Z" fill="white" />
      {/* Crown outline on white hair */}
      <path d="M 33 37 Q 34 26 50 24 Q 66 26 67 37" fill="none" stroke="#ccc" strokeWidth="0.5" />

      {/* Elaborate crown */}
      <path d="M 30 22 L 30 10 L 38 17 L 50 8 L 62 17 L 70 10 L 70 22 Z" fill="#FFD700" />
      <path d="M 30 22 L 70 22" stroke="#FFA500" strokeWidth="2.5" />
      {/* Crown gems */}
      <circle cx="50" cy="10" r="4" fill="#cc0000" stroke="#FFD700" strokeWidth="1" />
      <circle cx="36" cy="16" r="2.5" fill="#0044cc" />
      <circle cx="64" cy="16" r="2.5" fill="#0044cc" />
      <circle cx="43" cy="12" r="2" fill="#00aa44" />
      <circle cx="57" cy="12" r="2" fill="#00aa44" />

      {/* Scepter */}
      <rect x="74" y="60" width="3" height="30" rx="1.5" fill="#8B6914" />
      <circle cx="75.5" cy="58" r="5" fill="#FFD700" stroke="#FFA500" strokeWidth="1" />
      <circle cx="75.5" cy="58" r="2.5" fill="#cc0000" />
    </svg>
  )
}

// ── ERMITANYO — old hermit, robes, staff ────────────────
export function ErmitanyoArt({ size = 100 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="url(#erBg)" opacity="0.35" />
      <defs>
        <radialGradient id="erBg">
          <stop offset="0%" stopColor="#00c9a7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1a0a2e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Hooded robe — brown/earth tones */}
      <path d="M 18 95 L 25 55 Q 50 65 75 55 L 82 95 Z" fill="#5a3a1a" />
      {/* Robe folds */}
      <path d="M 40 65 L 42 95" stroke="#3a2010" strokeWidth="1" opacity="0.5" />
      <path d="M 55 65 L 57 95" stroke="#3a2010" strokeWidth="1" opacity="0.5" />
      <path d="M 50 65 L 50 95" stroke="#7a5a3a" strokeWidth="1" opacity="0.3" />

      {/* Hood */}
      <path d="M 28 48 Q 20 30 30 18 Q 50 8 70 18 Q 80 30 72 48 Q 65 38 50 36 Q 35 38 28 48 Z"
        fill="#6b4a2a" />

      {/* Neck */}
      <rect x="44" y="52" width="12" height="7" rx="4" fill="#c8885a" />

      {/* Face — very old, wise */}
      <circle cx="50" cy="40" r="16" fill="#c8885a" />
      {/* Deep wrinkles */}
      <path d="M 37 37 Q 42 34 43 38" fill="none" stroke="#9a6040" strokeWidth="1" />
      <path d="M 57 37 Q 62 34 63 38" fill="none" stroke="#9a6040" strokeWidth="1" />
      <path d="M 40 44 Q 44 42 44 46" fill="none" stroke="#9a6040" strokeWidth="0.8" />
      <path d="M 56 44 Q 60 42 60 46" fill="none" stroke="#9a6040" strokeWidth="0.8" />
      {/* Bushy eyebrows */}
      <path d="M 38 33 Q 43 30 47 33" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 53 33 Q 57 30 62 33" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      {/* Eyes — kind, squinting */}
      <path d="M 40 37 Q 43 35 46 37" fill="none" stroke="#2d1a0e" strokeWidth="2" strokeLinecap="round" />
      <path d="M 54 37 Q 57 35 60 37" fill="none" stroke="#2d1a0e" strokeWidth="2" strokeLinecap="round" />
      {/* Wise smile */}
      <path d="M 43 48 Q 50 54 57 48" fill="none" stroke="#8b4513" strokeWidth="1.5" strokeLinecap="round" />
      {/* Long white beard */}
      <path d="M 36 50 Q 50 65 64 50 Q 60 75 50 80 Q 40 75 36 50 Z" fill="white" opacity="0.95" />
      {/* Beard texture */}
      <path d="M 42 55 Q 50 68 58 55" fill="none" stroke="#ddd" strokeWidth="0.8" />
      <path d="M 44 62 Q 50 73 56 62" fill="none" stroke="#ddd" strokeWidth="0.8" />
      {/* Long white hair */}
      <path d="M 30 42 Q 22 55 25 70" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M 70 42 Q 78 55 75 70" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />

      {/* Glowing staff */}
      <rect x="76" y="40" width="4" height="55" rx="2" fill="#8B6914" />
      {/* Staff orb */}
      <circle cx="78" cy="36" r="8" fill="url(#staffGlow)" />
      <defs>
        <radialGradient id="staffGlow" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#00c9a7" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#007755" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      <circle cx="78" cy="36" r="5" fill="#00c9a7" opacity="0.5" />
      {/* Staff glow rays */}
      {[0,45,90,135,180,225,270,315].map((angle, i) => (
        <line key={i}
          x1={78} y1={36}
          x2={78 + Math.cos(angle * Math.PI / 180) * 13}
          y2={36 + Math.sin(angle * Math.PI / 180) * 13}
          stroke="#00c9a7" strokeWidth="0.8" opacity="0.4"
          strokeLinecap="round"
        />
      ))}
    </svg>
  )
}

// ── IBONG ADARNA — the legendary bird ───────────────────
export function AdarnaBirdArt({ size = 100 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="birdGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#00c9a7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1a0a2e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bodyGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#cc6600" />
        </radialGradient>
      </defs>

      {/* Outer glow */}
      <circle cx="50" cy="50" r="48" fill="url(#birdGlow)" />

      {/* Tail feathers */}
      <path d="M 55 65 Q 70 80 65 95 Q 55 82 50 78" fill="#00c9a7" opacity="0.9" />
      <path d="M 50 68 Q 55 85 48 98 Q 44 83 42 78" fill="#7b2fbf" opacity="0.9" />
      <path d="M 45 66 Q 30 80 35 95 Q 44 82 50 78" fill="#ff6b9d" opacity="0.9" />
      {/* Tail shimmer */}
      <path d="M 55 65 Q 72 78 68 93" fill="none" stroke="#FFD700" strokeWidth="0.8" opacity="0.6" />
      <path d="M 45 66 Q 28 78 32 93" fill="none" stroke="#FFD700" strokeWidth="0.8" opacity="0.6" />

      {/* Wings spread */}
      <path d="M 30 48 Q 10 38 12 28 Q 22 22 35 32 Q 28 40 30 48 Z"
        fill="#FFA500" stroke="#FFD700" strokeWidth="0.8" />
      <path d="M 70 48 Q 90 38 88 28 Q 78 22 65 32 Q 72 40 70 48 Z"
        fill="#FFA500" stroke="#FFD700" strokeWidth="0.8" />
      {/* Wing feather lines */}
      <path d="M 30 48 Q 14 35 16 27" fill="none" stroke="#FFD700" strokeWidth="0.7" opacity="0.7" />
      <path d="M 30 48 Q 18 40 18 32" fill="none" stroke="#FFD700" strokeWidth="0.7" opacity="0.7" />
      <path d="M 70 48 Q 86 35 84 27" fill="none" stroke="#FFD700" strokeWidth="0.7" opacity="0.7" />
      <path d="M 70 48 Q 82 40 82 32" fill="none" stroke="#FFD700" strokeWidth="0.7" opacity="0.7" />

      {/* Body */}
      <ellipse cx="50" cy="52" rx="20" ry="18" fill="url(#bodyGrad)" />

      {/* Breast — lighter */}
      <ellipse cx="50" cy="56" rx="12" ry="10" fill="#FFF4A0" opacity="0.7" />

      {/* Neck */}
      <path d="M 42 38 Q 50 34 58 38 L 56 48 Q 50 44 44 48 Z" fill="#FFA500" />

      {/* Head */}
      <circle cx="50" cy="32" r="13" fill="#FFD700" />

      {/* Crown feathers on head */}
      <path d="M 46 20 Q 44 10 48 6 Q 50 14 50 20" fill="#ff6b9d" />
      <path d="M 50 19 Q 50 8  50 4  Q 52 10 50 19" fill="#FFD700" />
      <path d="M 54 20 Q 56 10 52 6 Q 50 14 50 20" fill="#7b2fbf" />
      {/* Crown tips glow */}
      <circle cx="48" cy="6"  r="2" fill="#FFD700" opacity="0.9" />
      <circle cx="50" cy="4"  r="2.5" fill="white" opacity="0.9" />
      <circle cx="52" cy="6"  r="2" fill="#FFD700" opacity="0.9" />

      {/* Eye */}
      <circle cx="45" cy="30" r="4" fill="#1a0a00" />
      <circle cx="45" cy="30" r="2.5" fill="#cc4400" />
      <circle cx="44" cy="29" r="1.2" fill="white" />
      <circle cx="44.5" cy="29.5" r="0.6" fill="#1a0a00" />

      {/* Beak */}
      <path d="M 37 33 Q 30 35 32 38 Q 36 37 38 36 Z" fill="#cc6600" />
      <path d="M 37 33 Q 30 35 32 38" fill="none" stroke="#994400" strokeWidth="0.8" />

      {/* Magic notes emanating */}
      {[
        { x: 15, y: 25, r: 0 },
        { x: 82, y: 20, r: 15 },
        { x: 20, y: 60, r: -10 },
        { x: 78, y: 58, r: 10 },
      ].map((n, i) => (
        <g key={i} transform={`rotate(${n.r} ${n.x} ${n.y})`}>
          <text x={n.x} y={n.y} fontSize="10" fill="#FFD700" opacity="0.8" fontFamily="serif">♪</text>
        </g>
      ))}

      {/* Sparkles */}
      {[
        [22, 45], [78, 42], [50, 8], [15, 70], [85, 68],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1={x-4} y1={y} x2={x+4} y2={y} stroke="#FFD700" strokeWidth="1.2" opacity="0.7" />
          <line x1={x} y1={y-4} x2={x} y2={y+4} stroke="#FFD700" strokeWidth="1.2" opacity="0.7" />
        </g>
      ))}
    </svg>
  )
}

// ── Name → component map (used in CharacterGame) ────────
export const CHARACTER_ART = {
  'Don Juan':          DonJuanArt,
  'Don Pedro':         DonPedroArt,
  'Don Diego':         DonDiegoArt,
  'Haring Fernando':   HaringFernandoArt,
  'Ermitanyo':         ErmitanyoArt,
}
