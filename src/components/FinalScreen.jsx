import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Trophy, Star, RotateCcw, Award } from 'lucide-react'
import { useSound } from '../hooks/useSound'

// ── Score → star rating ──────────────────────────────────
function getStars(score) {
  if (score >= 220) return 5
  if (score >= 170) return 4
  if (score >= 120) return 3
  if (score >= 70)  return 2
  return 1
}

// ── Score → message ──────────────────────────────────────
function getMessage(score) {
  if (score >= 220) return 'Perpekto! Ikaw ay tunay na bayani tulad ni Don Juan! Naipamalas mo ang lahat ng iyong kaalaman!'
  if (score >= 170) return 'Napakahusay! Malinaw na malinaw ang iyong kaalaman sa Ibong Adarna. Kahanga-hanga!'
  if (score >= 120) return 'Magaling! Maraming naitamang sagot. Patuloy na mag-aral para maabot ang pinakamataas na puntos!'
  if (score >= 70)  return 'Mabuti! Naunawaan mo ang pangunahing bahagi ng kwento. Subukan muli para mas matuto!'
  return 'Salamat sa paglalaro! Basahin muli ang Ibong Adarna at subukan ulit. Kaya mo ito!'
}

// ── Achievements ─────────────────────────────────────────
const BADGES = [
  { key: 'vocab',   icon: '📖', label: 'Talasalitaan Master',  threshold: 20  },
  { key: 'chars',   icon: '👑', label: 'Karakter Expert',       threshold: 50  },
  { key: 'puzzle',  icon: '🧩', label: 'Puzzle Solver',         threshold: 80  },
  { key: 'order',   icon: '📜', label: 'Kwento Historian',      threshold: 130 },
  { key: 'champ',   icon: '🦜', label: 'Adarna Champion',       threshold: 180 },
  { key: 'perfect', icon: '🌟', label: 'Perpektong Bayani',     threshold: 220 },
]

// ── Confetti burst ────────────────────────────────────────
function fireConfetti() {
  const colors = ['#FFD700', '#FFA500', '#00c9a7', '#ff6b9d', '#7b2fbf', '#00e676']
  confetti({ particleCount: 120, spread: 90, origin: { y: 0.55 }, colors })
  setTimeout(() => confetti({ particleCount: 60, spread: 60, origin: { x: 0.1, y: 0.6 }, colors }), 400)
  setTimeout(() => confetti({ particleCount: 60, spread: 60, origin: { x: 0.9, y: 0.6 }, colors }), 700)
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
}
const item = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function FinalScreen({ game }) {
  const stars   = getStars(game.score)
  const message = getMessage(game.score)
  const earned  = BADGES.filter(b => game.score >= b.threshold)
  const sound   = useSound()

  useEffect(() => {
    fireConfetti()
    const t = setTimeout(fireConfetti, 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="h-full w-full flex flex-col items-center justify-start gap-2.5 overflow-y-auto py-1 pr-1">

      {/* Bird */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.1 }}
        className="text-6xl sm:text-7xl mt-1 mb-0.5 animate-float select-none"
      >
        🦜
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-display text-4xl sm:text-5xl text-shimmer text-center mb-1"
      >
        Tapos Na!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-white/60 italic text-sm sm:text-base tracking-widest"
      >
        - Adarna Quest Complete -
      </motion.p>

      {/* Score card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.45, type: 'spring', stiffness: 200, damping: 15 }}
        className="glass-card px-6 py-4 text-center w-full max-w-md"
      >
        <div className="text-white/50 text-sm uppercase tracking-widest mb-1">Kabuuang Puntos</div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
          className="font-display text-5xl sm:text-6xl text-gold mb-3"
          style={{ textShadow: '0 0 40px rgba(255,215,0,0.5)' }}
        >
          {game.score}
        </motion.div>

        {/* Stars */}
        <div className="flex justify-center gap-1 mb-2.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <motion.div
              key={s}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7 + s * 0.1, type: 'spring', stiffness: 300 }}
            >
              <Star
                size={24}
                className={s <= stars ? 'text-gold fill-gold' : 'text-white/20'}
              />
            </motion.div>
          ))}
        </div>

        {/* Tiles revealed */}
        <div className="text-white/70 text-base sm:text-lg">
          🧩 {game.tilesRevealed} / {game.totalTiles} tiles na-reveal
        </div>
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="glass-card px-5 py-3.5 w-full max-w-5xl text-center"
      >
        <p className="text-white/90 text-base sm:text-lg leading-relaxed">{message}</p>
      </motion.div>

      {/* Achievements */}
      {earned.length > 0 && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-6xl"
        >
          <div className="flex items-center gap-2 mb-2 justify-center">
            <Award size={18} className="text-gold" />
            <h3 className="font-display text-gold text-xl">Mga Natanggap na Badge</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {earned.map((badge) => (
              <motion.div
                key={badge.key}
                variants={item}
                className="glass-card border border-gold/20 rounded-3xl p-3 text-center"
              >
                <div className="text-3xl mb-1.5">{badge.icon}</div>
                <div className="text-white/90 text-sm sm:text-base font-bold">{badge.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Closing quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="text-center text-white/45 text-sm sm:text-base italic max-w-4xl leading-relaxed"
      >
        "Ang Ibong Adarna ay simbolo ng tagumpay, pag-asa, at pagmamahal sa pamilya."
        <br />- Huwag kalimutan ang aral ng kwento!
      </motion.div>

      {/* Restart */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          sound.playClick()
          game.reset()
        }}
        className="btn-purple flex items-center gap-2"
      >
        <RotateCcw size={18} />
        Maglaro Muli
      </motion.button>

    </div>
  )
}
