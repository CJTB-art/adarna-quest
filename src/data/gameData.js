// =====================================================================
//  ADARNA QUEST — GAME DATA
//  ✏️  Edit this file to change all questions, characters, and story
//      content without touching any component files.
// =====================================================================


// ── SECTION 1: TALASALITAAN (Jumbled Words) ───────────────────────────
// Each entry:
//   word      — the CORRECT word (ALL CAPS)
//   meaning   — Filipino definition shown after correct answer
// The game automatically scrambles the letters on render.
// ─────────────────────────────────────────────────────────────────────
export const VOCAB_WORDS = [
  {
    word:    'HARI',
    meaning: 'Ang pinakamataas na namumuno sa isang kaharian. Siya ang ama ng tatlong prinsipe na nagkasakit at kailangan ng awit ng Ibong Adarna.',
  },
  {
    word:    'ADARNA',
    meaning: 'Ang mahiwagang ibon na nagagamot ng lahat ng karamdaman. Kapag umawit ito nang pitong beses, natutulog na ito at nagiging bato ang sinumang mapiso ng dumi nito.',
  },
  {
    word:    'PRINSIPE',
    meaning: 'Ang anak na lalaki ng hari at reyna. Tatlong prinsipe ang isinugo ni Haring Fernando para hanapin ang Ibong Adarna.',
  },
  {
    word:    'ERMITANYO',
    meaning: 'Isang matandang hermit na naninirahan sa bundok. Binigyan niya si Don Juan ng mahahalagang payo para makamit ang kanyang misyon.',
  },
  {
    word:    'KAHARIAN',
    meaning: 'Ang lupaing pinamumunuan ng isang hari. Ang kaharian ng Berbanya ang tahanan ng tatlong prinsipe at kanilang amang si Haring Fernando.',
  },
]


// ── SECTION 2: CHARACTER GUESSING GAME ───────────────────────────────
// Each entry:
//   name        — correct character name
//   emoji       — large emoji used as character portrait
//   clue        — first-person clue (HTML allowed for <strong>)
//   description — shown after correct answer
//   options     — array of { name, emoji } for the choice buttons
//                 include the correct answer somewhere in options
// ─────────────────────────────────────────────────────────────────────
export const CHAR_QUESTIONS = [
  {
    name:        'Don Juan',
    emoji:       '🤴',
    clue:        'Ako ang <strong>pinakabata</strong> sa tatlong prinsipe. Mabait, mapagkumbaba, at matapang ang puso. Nagtagumpay akong makuha ang Ibong Adarna para sa aking amang maysakit.',
    description: 'Si Don Juan ay ang bunso — kumakatawan sa kadakilaan ng mabuting puso. Nanalig siya sa Diyos at sa payo ng Ermitanyo, at tagumpay na naibalik ang Ibong Adarna sa kaharian.',
    options: [
      { name: 'Don Juan',          emoji: '🤴' },
      { name: 'Don Pedro',         emoji: '🧔' },
      { name: 'Don Diego',         emoji: '👦' },
      { name: 'Haring Fernando',   emoji: '👴' },
    ],
  },
  {
    name:        'Haring Fernando',
    emoji:       '👴',
    clue:        'Ako ang <strong>Hari ng Berbanya</strong>. Naghihirap ako sa matinding sakit na walang makagamot. Sinabi ng manggagamot na tanging ang awit ng Ibong Adarna lamang ang makapagpapagaling sa akin.',
    description: 'Si Haring Fernando ay ang ama ng tatlong prinsipe. Ang kanyang pagkakasakit ang naging sanhi ng dakilang pakikipagsapalaran ng kanyang mga anak — lalo na si Don Juan.',
    options: [
      { name: 'Don Juan',          emoji: '🤴' },
      { name: 'Don Pedro',         emoji: '🧔' },
      { name: 'Haring Fernando',   emoji: '👴' },
      { name: 'Ermitanyo',         emoji: '🧙' },
    ],
  },
  {
    name:        'Don Diego',
    emoji:       '👦',
    clue:        'Ako ang <strong>panggitnang prinsipe</strong>. Tulad ng aking kapatid na si Don Pedro, nabigo rin ako sa aking misyon. Natulog ako sa ilalim ng punong Piedras Platas at napiso ng dumi ng Ibong Adarna.',
    description: 'Si Don Diego ay ang ikalawang anak. Tulad ni Don Pedro, hindi rin niya naisagawa ang payo ng Ermitanyo — natulog siya at naging bato sa Bundok Tabor.',
    options: [
      { name: 'Don Juan',  emoji: '🤴' },
      { name: 'Don Diego', emoji: '👦' },
      { name: 'Don Pedro', emoji: '🧔' },
      { name: 'Ermitanyo', emoji: '🧙' },
    ],
  },
  {
    name:        'Ermitanyo',
    emoji:       '🧙',
    clue:        'Ako ay isang <strong>matandang hermit</strong> na naninirahan nang mag-isa sa bundok. Nagbigay ako ng mahalagang payo kay Don Juan: huwag matulog sa ilalim ng punong Piedras Platas, at gumamit ng limon para hindi napiso ng Ibong Adarna.',
    description: 'Ang Ermitanyo ay kumakatawan sa karunungan at gabay ng Diyos. Ang kanyang mga payo ang susi sa tagumpay ni Don Juan — isang paalala na ang karunungan ng matatanda ay mahalaga.',
    options: [
      { name: 'Ermitanyo',       emoji: '🧙' },
      { name: 'Don Juan',        emoji: '🤴' },
      { name: 'Haring Fernando', emoji: '👴' },
      { name: 'Don Pedro',       emoji: '🧔' },
    ],
  },
  {
    name:        'Don Pedro',
    emoji:       '🧔',
    clue:        'Ako ang <strong>panganay na prinsipe</strong>. Una akong isinugo ng ating ama para hanapin ang Ibong Adarna sa Bundok Tabor, ngunit nabigo ako. Natulog ako sa ilalim ng puno at napiso.',
    description: 'Si Don Pedro ang panganay — nagpakita ng kapalaluan at kawalan ng tiyaga. Naging bato siya sa Bundok Tabor bilang kahihinatnan ng kanyang pagkakamali at inggit sa kanyang kapatid.',
    options: [
      { name: 'Don Pedro',       emoji: '🧔' },
      { name: 'Don Juan',        emoji: '🤴' },
      { name: 'Don Diego',       emoji: '👦' },
      { name: 'Haring Fernando', emoji: '👴' },
    ],
  },
]


// ── SECTION 3: PUZZLE TRIVIA QUESTIONS ───────────────────────────────
// Each correct answer reveals one puzzle tile.
// options: array of { text, correct: true/false }
//          exactly ONE should have correct: true
// ─────────────────────────────────────────────────────────────────────
export const PUZZLE_QUESTIONS = [
  {
    question: 'Saan matatagpuan ang Ibong Adarna?',
    options: [
      { text: 'Bundok Tabor',           correct: true  },
      { text: 'Palasyo ng Hari',         correct: false },
      { text: 'Dagat ng Berbanya',       correct: false },
      { text: 'Kagubatan ng Ginto',      correct: false },
    ],
  },
  {
    question: 'Ano ang nangyayari sa umawit ang Ibong Adarna?',
    options: [
      { text: 'Nagagamot ang maysakit',  correct: true  },
      { text: 'Lumilindol ang lupa',     correct: false },
      { text: 'Nag-uulan ng perlas',     correct: false },
      { text: 'Nagsisimula ang gabi',    correct: false },
    ],
  },
  {
    question: 'Ilang beses umawit ang Ibong Adarna bago matulog?',
    options: [
      { text: '7 beses',  correct: true  },
      { text: '3 beses',  correct: false },
      { text: '5 beses',  correct: false },
      { text: '10 beses', correct: false },
    ],
  },
  {
    question: 'Ano ang ginawa ni Don Juan para hindi matulog?',
    options: [
      { text: 'Nagpipintig ng sarili',   correct: true  },
      { text: 'Kumakain ng agahan',      correct: false },
      { text: 'Umiiinom ng kape',        correct: false },
      { text: 'Tumatawid sa ilog',       correct: false },
    ],
  },
  {
    question: 'Sino ang nagbigay ng payo kay Don Juan bago umalis?',
    options: [
      { text: 'Ang Ermitanyo',           correct: true  },
      { text: 'Ang kanyang Ama',         correct: false },
      { text: 'Ang Ibong Adarna',        correct: false },
      { text: 'Ang kanyang Kapatid',     correct: false },
    ],
  },
  {
    question: 'Ano ang ginamit ni Don Juan para ma-capture ang ibon?',
    options: [
      { text: 'Limon at pagtitiis',      correct: true  },
      { text: 'Gintong hawla',           correct: false },
      { text: 'Mahiwagang anting-anting',correct: false },
      { text: 'Espada ng hari',          correct: false },
    ],
  },
  {
    question: 'Ano ang kahihinatnan ng napiso ng dumi ng Ibong Adarna?',
    options: [
      { text: 'Naging bato',             correct: true  },
      { text: 'Naging hayop',            correct: false },
      { text: 'Namatay agad',            correct: false },
      { text: 'Lumipat sa ibang mundo',  correct: false },
    ],
  },
  {
    question: 'Ilang prinsipe ang isinugo ng Hari?',
    options: [
      { text: 'Tatlo (3)',  correct: true  },
      { text: 'Dalawa (2)', correct: false },
      { text: 'Isa (1)',    correct: false },
      { text: 'Apat (4)',   correct: false },
    ],
  },
]


// ── SECTION 4: STORY ORDER CHALLENGE ─────────────────────────────────
// Write events in the CORRECT chronological order.
// The game automatically shuffles them for the student.
// ─────────────────────────────────────────────────────────────────────
export const STORY_EVENTS = [
  'Nagkasakit si Haring Fernando. Sinabi ng manggagamot na tanging ang awit ng Ibong Adarna lamang ang makapagpapagaling sa kanya.',
  'Isinugo ng Hari si Don Pedro (panganay), ngunit nabigo siya — natulog sa ilalim ng puno at naging bato.',
  'Isinugo naman si Don Diego (panggitnang prinsipe), ngunit katulad ni Don Pedro, nabigo rin siya.',
  'Nagpunta si Don Juan kay Ermitanyo na nagbigay ng mahahalagang payo at limon para hindi siya mapiso ng Ibong Adarna.',
  'Natagpuan ni Don Juan ang punong Piedras Platas, pinigilan ang antok, at matagumpay na nakuha ang Ibong Adarna matapos ang pitong awit nito.',
  'Dinala ni Don Juan ang Ibong Adarna sa palasyo at gumaling si Haring Fernando. Naibalik ang kapayapaan sa kaharian ng Berbanya.',
]


// ── PUZZLE TILE CONTENT ───────────────────────────────────────────────
// 16 tiles arranged in a 4×4 grid.
// Each tile shows this content when revealed.
// You can use emojis, short text, or mix both.
// ─────────────────────────────────────────────────────────────────────
export const PUZZLE_TILES = [
  // Row 1 — sky/stars
  { bg: '#1a0a2e', content: '✨', label: '' },
  { bg: '#2d0b55', content: '⭐', label: '' },
  { bg: '#1a0a2e', content: '💫', label: '' },
  { bg: '#2d0b55', content: '✨', label: '' },
  // Row 2 — wings
  { bg: '#7b2fbf', content: '🪶', label: 'Pakpak' },
  { bg: '#00c9a7', content: '🦜', label: 'Ibong' },
  { bg: '#00c9a7', content: '🎶', label: 'Adarna' },
  { bg: '#7b2fbf', content: '🌿', label: '' },
  // Row 3 — body
  { bg: '#5c1a9e', content: '🌸', label: '' },
  { bg: '#FFD700', content: '👑', label: 'Sagisag' },
  { bg: '#FFD700', content: '🌟', label: 'ng Hari' },
  { bg: '#5c1a9e', content: '🌺', label: '' },
  // Row 4 — base/ground
  { bg: '#2d0b55', content: '🍃', label: '' },
  { bg: '#3b0d6b', content: '🌙', label: '' },
  { bg: '#3b0d6b', content: '🌿', label: '' },
  { bg: '#2d0b55', content: '🍃', label: '' },
]
