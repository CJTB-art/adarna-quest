import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, ChevronRight, CheckCircle2, XCircle } from 'lucide-react'
import { CHAR_QUESTIONS } from '../data/gameData'
import { CHARACTER_ART } from './CharacterArt'
import { useSound } from '../hooks/useSound'

const CHARACTER_IMAGE_SRC = {
  'Don Juan': '/images/characters/don-juan.png',
  'Don Pedro': '/images/characters/don-pedro.png',
  'Don Diego': '/images/characters/don-diego.png',
  'Haring Fernando': '/images/characters/haring-fernando.png',
  'Ermitanyo': '/images/characters/ermitanyo.png',
}

function CharacterPortrait({ name, fallback: FallbackArt, emoji, size = 120, className = '' }) {
  const [failed, setFailed] = useState(false)
  const src = CHARACTER_IMAGE_SRC[name]

  useEffect(() => {
    setFailed(false)
  }, [name])

  if (src && !failed) {
    const dimProps = typeof size === 'number' ? { width: size, height: size } : {}
    return (
      <img
        src={src}
        alt={name}
        {...dimProps}
        onError={() => setFailed(true)}
        className={`object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    )
  }

  const fallbackSize = typeof size === 'number' ? size : 180
  return FallbackArt ? <FallbackArt size={fallbackSize} /> : <span className="text-6xl">{emoji}</span>
}

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function CharacterGame({ game }) {
  const [qIdx,     setQIdx]     = useState(0)
  const [options,  setOptions]  = useState([])
  const [selected, setSelected] = useState(null)
  const [status,   setStatus]   = useState('idle')
  const sound = useSound()
  const current = CHAR_QUESTIONS[qIdx]

  useEffect(() => {
    setOptions(shuffleArray(current.options))
    setSelected(null)
    setStatus('idle')
  }, [qIdx])

  function choose(name) {
    if (status !== 'idle') return
    sound.playClick()
    setSelected(name)
    if (name === current.name) {
      setStatus('correct')
      game.addScore('charCorrect')
      game.revealTile()
      sound.playCorrect()
      sound.playReveal()
    } else {
      setStatus('wrong')
      sound.playWrong()
    }
  }

  function next() {
    sound.playClick()
    if (qIdx + 1 >= CHAR_QUESTIONS.length) game.goTo(3)
    else setQIdx(i => i + 1)
  }

  return (
    <div className="h-full glass-card px-4 py-3 sm:px-5 sm:py-4 flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 mb-0.5">
        <Users size={22} className="text-rose" />
        <h2 className="font-display text-gold text-2xl sm:text-3xl">Sino Ito?</h2>
      </div>
      <p className="text-white/70 text-sm sm:text-base mb-2">Basahin ang clue. I-click ang tamang karakter!</p>

      <div className="flex gap-2 justify-center mb-2">
        {CHAR_QUESTIONS.map((_, i) => (
          <div key={i} className={`h-3 rounded-full transition-all duration-300 ${
            i < qIdx ? 'bg-jade w-10' : i === qIdx ? 'bg-gold w-10 shadow-gold' : 'bg-white/15 w-7'
          }`} />
        ))}
      </div>

      <motion.div key={qIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        className="rounded-3xl border border-gold/20 bg-gold/5 p-3 sm:p-4 mb-2">
        <p className="text-white/60 text-sm sm:text-base uppercase tracking-widest mb-1.5">Clue:</p>
        <p className="text-white/95 text-base sm:text-lg leading-relaxed italic"
          dangerouslySetInnerHTML={{ __html: `"${current.clue}"` }} />
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-2">
        {options.map((opt) => {
          const Art = CHARACTER_ART[opt.name]
          const isCorrect  = opt.name === current.name
          const isSelected = opt.name === selected
          let borderCls = 'border-white/15 hover:border-gold/60'
          let bgCls     = 'bg-white/5 hover:bg-gold/8'
          if (status !== 'idle') {
            if (isCorrect)       { borderCls = 'border-jade';    bgCls = 'bg-jade/15' }
            else if (isSelected) { borderCls = 'border-red-400'; bgCls = 'bg-red-500/15' }
            else                 { borderCls = 'border-white/8'; bgCls = 'bg-white/3 opacity-50' }
          }
          return (
            <motion.button key={opt.name} onClick={() => choose(opt.name)}
              disabled={status !== 'idle'}
              whileHover={status === 'idle' ? { y: -4, scale: 1.03 } : {}}
              whileTap={status === 'idle'   ? { scale: 0.96 } : {}}
              className={`rounded-3xl border-2 p-0 h-[clamp(170px,24vh,250px)] overflow-hidden
                transition-all duration-200 font-body ${borderCls} ${bgCls}`}>
              <div className="relative h-full w-full">
                <CharacterPortrait
                  name={opt.name}
                  fallback={Art}
                  emoji={opt.emoji}
                  size="100%"
                  className="w-full h-full rounded-[22px]"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/85 via-black/50 to-transparent pointer-events-none" />
                <span className="absolute bottom-2 left-2 right-2 text-white font-bold text-lg sm:text-2xl text-center leading-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.95)]">
                  {opt.name}
                </span>
                  {status !== 'idle' && isCorrect && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      className="absolute -top-1 -right-1 bg-jade rounded-full p-0.5">
                      <CheckCircle2 size={16} className="text-deep" />
                    </motion.div>
                  )}
                  {status !== 'idle' && isSelected && !isCorrect && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5">
                      <XCircle size={16} className="text-white" />
                    </motion.div>
                  )}
              </div>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {status !== 'idle' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`mb-2 ${status === 'correct' ? 'feedback-correct' : 'feedback-wrong'}`}>
            <div className="flex items-start gap-3">
              {(() => {
                const Art = CHARACTER_ART[current.name]
                return <CharacterPortrait name={current.name} fallback={Art} emoji={current.emoji} size={74} />
              })()}
              <div>
                <p className="font-bold text-base sm:text-lg mb-1">
                  {status === 'correct' ? `Tama! Si ${current.name}!` : `Mali. Ang tamang sagot ay si ${current.name}.`}
                </p>
                <p className="text-white/80 text-xs sm:text-base leading-relaxed">{current.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status !== 'idle' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="pt-1 flex justify-center">
            <button onClick={next} className="btn-teal flex items-center gap-2">
              {qIdx + 1 >= CHAR_QUESTIONS.length ? 'Susunod na Laro' : 'Susunod na Karakter'}
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
