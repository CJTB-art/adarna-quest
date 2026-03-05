import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, ChevronRight, CheckCircle2, XCircle, BookOpen } from 'lucide-react'
import { useSound } from '../hooks/useSound'
import { VOCAB_WORDS } from '../data/gameData'

// ── Deterministic Fisher-Yates shuffle with seed ────────
function shuffleWord(word) {
  const arr = word.split('')
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  // Ensure it's actually scrambled (not same as original)
  if (arr.join('') === word && word.length > 1) return shuffleWord(word)
  return arr
}

export default function VocabGame({ game }) {
  const [wordIdx,   setWordIdx]   = useState(0)
  const [tiles,     setTiles]     = useState([])   // { letter, id, used }
  const [answer,    setAnswer]    = useState([])   // { letter, tileId }
  const [status,    setStatus]    = useState('idle') // idle | correct | wrong
  const [showNext,  setShowNext]  = useState(false)

  const sound = useSound()
  const current = VOCAB_WORDS[wordIdx]

  // ── Build fresh tile set for current word ────────────
  const buildTiles = useCallback((word) => {
    const letters = shuffleWord(word)
    return letters.map((letter, i) => ({ letter, id: i, used: false }))
  }, [])

  useEffect(() => {
    setTiles(buildTiles(current.word))
    setAnswer([])
    setStatus('idle')
    setShowNext(false)
  }, [wordIdx, current.word, buildTiles])

  // ── Click a source tile ──────────────────────────────
  function clickTile(tile) {
    if (tile.used || status !== 'idle') return
    const newAnswer = [...answer, { letter: tile.letter, tileId: tile.id }]
    setTiles(t => t.map(t => t.id === tile.id ? { ...t, used: true } : t))
    setAnswer(newAnswer)
    if (newAnswer.length === current.word.length) checkAnswer(newAnswer)
  }

  // ── Remove a letter from the answer row ─────────────
  function removeAnswerLetter(idx) {
    if (status !== 'idle') return
    const removed = answer[idx]
    setTiles(t => t.map(t => t.id === removed.tileId ? { ...t, used: false } : t))
    setAnswer(a => a.filter((_, i) => i !== idx))
  }

  // ── Clear all ────────────────────────────────────────
  function clearAll() {
    setTiles(buildTiles(current.word))
    setAnswer([])
    setStatus('idle')
  }

  // ── Validate ─────────────────────────────────────────
  function checkAnswer(ans) {
    const formed = ans.map(a => a.letter).join('')
    if (formed === current.word) {
      setStatus('correct')
      game.addScore('vocabCorrect')
      sound.playCorrect()
      sound.playReveal()
      game.revealTile()
    } else {
      setStatus('wrong')
      sound.playWrong()
    }
    setShowNext(true)
  }

  // ── Next word or finish ──────────────────────────────
  function next() {
    sound.playClick()
    if (wordIdx + 1 >= VOCAB_WORDS.length) {
      game.goTo(2)
    } else {
      setWordIdx(i => i + 1)
    }
  }

  return (
    <div className="h-full glass-card p-6 sm:p-8 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <BookOpen size={22} className="text-gold" />
        <h2 className="font-display text-gold text-2xl sm:text-3xl">Talasalitaan Challenge</h2>
      </div>
      <p className="text-white/70 text-lg mb-6">
        I-click ang mga letra para mabuo ang tamang salita!
      </p>

      {/* Progress dots */}
      <div className="flex gap-3 justify-center mb-5">
        {VOCAB_WORDS.map((_, i) => (
          <motion.div
            key={i}
            className={`h-3 rounded-full transition-all duration-300 ${
              i < wordIdx  ? 'bg-jade w-12'
            : i === wordIdx ? 'bg-gold w-12 shadow-gold'
            :                 'bg-white/15 w-8'
            }`}
          />
        ))}
      </div>

      {/* Word counter */}
      <p className="text-center text-white/60 text-lg tracking-widest mb-5">
        SALITA {wordIdx + 1} NG {VOCAB_WORDS.length}
      </p>

      {/* ── Scrambled letter tiles ── */}
      <div className="flex flex-wrap gap-5 sm:gap-6 justify-center min-h-[118px] mb-6">
        <AnimatePresence>
          {tiles.map((tile) => (
            <motion.button
              key={tile.id}
              layout
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => clickTile(tile)}
              className={`letter-tile ${tile.used ? 'used' : ''}`}
              disabled={tile.used || status !== 'idle'}
            >
              {tile.letter}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Divider label */}
      <p className="text-center text-white/45 text-base tracking-widest mb-3">▼ IYONG SAGOT ▼</p>

      {/* ── Answer slots ── */}
      <div className="flex flex-wrap gap-5 sm:gap-6 justify-center min-h-[118px] mb-5">
        {Array.from({ length: current.word.length }).map((_, i) => {
          const filled = answer[i]
          return (
            <motion.button
              key={i}
              onClick={() => filled && removeAnswerLetter(i)}
              className={`
                answer-slot
                ${status === 'correct' ? 'border-jade bg-jade/10 border-solid' : ''}
                ${status === 'wrong'   ? 'border-red-400 bg-red-500/10 border-solid' : ''}
              `}
              whileHover={filled && status === 'idle' ? { scale: 1.08, borderColor: '#ff4444' } : {}}
            >
              <AnimatePresence mode="wait">
                {filled && (
                  <motion.span
                    key={filled.tileId}
                    initial={{ scale: 0, y: -10 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    {filled.letter}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>

      {/* ── Feedback ── */}
      <AnimatePresence>
        {status !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mb-5 ${status === 'correct' ? 'feedback-correct' : 'feedback-wrong'}`}
          >
            <div className="flex items-start gap-3">
              {status === 'correct'
                ? <CheckCircle2 size={24} className="text-jade flex-shrink-0 mt-0.5" />
                : <XCircle     size={24} className="text-red-400 flex-shrink-0 mt-0.5" />
              }
              <div>
                <p className="font-bold text-lg">
                  {status === 'correct'
                    ? `✅ Tama! Ang salita ay "${current.word}"`
                    : `❌ Mali. Ang tamang sagot ay: ${current.word}`
                  }
                </p>
                <p className="text-white/90 text-xl leading-relaxed mt-2">
                  <span className="text-gold font-semibold">📖 Kahulugan:</span>{' '}
                  {current.meaning}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Action buttons ── */}
      <div className="flex gap-3 justify-center">
        {!showNext && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={clearAll}
            className="btn-purple flex items-center gap-2 text-base px-6 py-3"
          >
            <RotateCcw size={16} />
            I-clear
          </motion.button>
        )}

        {showNext && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1,   opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={next}
            className="btn-teal flex items-center gap-2"
          >
            {wordIdx + 1 >= VOCAB_WORDS.length ? 'Susunod na Laro' : 'Susunod na Salita'}
            <ChevronRight size={18} />
          </motion.button>
        )}
      </div>

    </div>
  )
}

