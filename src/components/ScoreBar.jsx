import { motion } from 'framer-motion'
import { Star, LayoutGrid, Volume2, VolumeX } from 'lucide-react'

// Section labels shown in the progress bar
const SECTION_LABELS = ['Talasalitaan', 'Karakter', 'Puzzle', 'Kwento']

export default function ScoreBar({ score, section, tilesRevealed, totalTiles, musicOn, onToggleMusic }) {
  // section prop is 1–4 (screens 1–4), map to 0-based for dots
  const activeDot = section - 1

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card flex items-center justify-between px-4 sm:px-5 py-2 sm:py-2.5 mb-2 gap-2 sm:gap-4"
    >
      {/* Score */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Star className="text-gold fill-gold" size={20} />
        <div>
          <div className="text-gold/70 text-[10px] sm:text-xs uppercase tracking-widest leading-none">Puntos</div>
          <motion.div
            key={score}
            initial={{ scale: 1.4, color: '#00e676' }}
            animate={{ scale: 1,   color: '#FFD700' }}
            transition={{ duration: 0.35 }}
            className="font-display text-xl sm:text-2xl font-bold leading-none text-gold"
          >
            {score}
          </motion.div>
        </div>
      </div>

      {/* Section dots */}
      <div className="flex items-center gap-1 sm:gap-2">
        {SECTION_LABELS.map((label, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className={`
                prog-dot
                ${i < activeDot  ? 'prog-dot-done'
                : i === activeDot ? 'prog-dot-active'
                :                   'prog-dot-pending'}
              `}
              title={label}
            />
            <span className="text-white/50 text-[11px] hidden md:block">{label}</span>
          </div>
        ))}
      </div>

      {/* Tiles revealed */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <LayoutGrid className="text-teal" size={20} />
        <div>
          <div className="text-teal/70 text-[10px] sm:text-xs uppercase tracking-widest leading-none">Tiles</div>
          <div className="font-display text-xl sm:text-2xl font-bold leading-none text-teal">
            {tilesRevealed}<span className="text-white/40 text-base sm:text-lg">/{totalTiles}</span>
          </div>
        </div>
        <button
          onClick={onToggleMusic}
          className="ml-1 rounded-full border border-white/20 bg-white/5 p-1.5 sm:p-2 hover:border-gold/50 transition-colors"
          aria-label={musicOn ? 'Patayin ang musika' : 'Buksan ang musika'}
          title={musicOn ? 'Music: On' : 'Music: Off'}
        >
          {musicOn
            ? <Volume2 size={16} className="text-teal" />
            : <VolumeX size={16} className="text-white/65" />
          }
        </button>
      </div>
    </motion.div>
  )
}
