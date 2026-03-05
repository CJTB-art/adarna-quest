import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Grid2x2, ChevronRight, CheckCircle2, XCircle, Sparkles } from 'lucide-react'
import { PUZZLE_QUESTIONS } from '../data/gameData'
import AdarnaPuzzleImage from './AdarnaPuzzleImage'
import { useSound } from '../hooks/useSound'

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function PuzzleReveal({ game }) {
  const [qIdx,    setQIdx]    = useState(0)
  const [options, setOptions] = useState([])
  const [status,  setStatus]  = useState('idle')
  const [done,    setDone]    = useState(false)
  const sound = useSound()

  const allRevealed = game.tilesRevealed >= game.totalTiles
  const current = PUZZLE_QUESTIONS[qIdx]

  useEffect(() => {
    if (current) setOptions(shuffleArray(current.options))
    setStatus('idle')
  }, [qIdx])

  useEffect(() => {
    if (allRevealed) {
      setDone(true)
      sound.playFanfare()
    }
  }, [allRevealed])

  function choose(opt) {
    if (status !== 'idle') return
    if (opt.correct) {
      setStatus('correct')
      game.addScore('puzzleCorrect')
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
    const nextIdx = qIdx + 1
    if (nextIdx >= PUZZLE_QUESTIONS.length || allRevealed) setDone(true)
    else setQIdx(nextIdx)
  }

  return (
    <div className="h-full glass-card px-4 py-3.5 sm:px-5 sm:py-4 flex flex-col overflow-hidden">
      <div className="flex items-start justify-between gap-3 mb-0.5">
        <div className="flex items-center gap-2">
          <Grid2x2 size={22} className="text-teal" />
          <h2 className="font-display text-gold text-2xl sm:text-3xl">I-reveal ang Ibong Adarna!</h2>
        </div>
        <div className="flex gap-2">
          {[
            { val: game.tilesRevealed, lbl: 'Na-reveal',  color: 'text-gold' },
            { val: game.totalTiles,    lbl: 'Kabuuan',    color: 'text-white/60' },
            { val: `${Math.round((game.tilesRevealed / game.totalTiles) * 100)}%`, lbl: 'Kumpleto', color: 'text-teal' },
          ].map(s => (
            <div key={s.lbl} className="glass-card px-3 py-2 text-center min-w-[108px]">
              <div className={`font-display text-xl sm:text-2xl leading-none ${s.color}`}>{s.val}</div>
              <div className="text-white/60 text-xs sm:text-sm uppercase tracking-widest">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-white/70 text-base sm:text-lg mb-2">Sumagot nang tama para ma-unlock ang bawat puzzle tile.</p>

      <div className="grid xl:grid-cols-2 gap-3 items-stretch flex-1 min-h-0 pt-0">
        <AdarnaPuzzleImage tilesRevealed={game.tilesRevealed} totalTiles={game.totalTiles} />

      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6">
            <div className="text-6xl mb-3 animate-float">🦜</div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles size={20} className="text-gold" />
              <h3 className="font-display text-teal text-xl">Ang Ibong Adarna ay Natuklasan!</h3>
              <Sparkles size={20} className="text-gold" />
            </div>
            <p className="text-white/75 text-lg mb-6">Napakagaling! Lahat ng tiles ay na-reveal na!</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => { sound.playClick(); game.goTo(4) }}
              className="btn-gold flex items-center gap-2 mx-auto">
              Huli na — Ayusin ang Kwento <ChevronRight size={18} />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col justify-start pt-0">
            <div className="rounded-3xl border border-gold/20 bg-gold/5 p-3 mb-2.5">
              <p className="text-white/60 text-lg uppercase tracking-widest mb-1">
                Tanong {qIdx + 1} ng {PUZZLE_QUESTIONS.length}
              </p>
              <p className="text-white font-bold text-2xl sm:text-3xl">{current?.question}</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mb-3">
              {options.map((opt, i) => {
                let cls = 'border-white/15 bg-white/5 hover:border-teal/60 hover:bg-teal/8'
                if (status !== 'idle') {
                  if (opt.correct) cls = 'border-jade bg-jade/15'
                  else             cls = 'border-white/10 bg-white/3 opacity-50'
                }
                return (
                  <motion.button key={i} onClick={() => choose(opt)}
                    disabled={status !== 'idle'}
                    whileHover={status === 'idle' ? { y: -2 } : {}}
                    whileTap={status === 'idle'   ? { scale: 0.97 } : {}}
                    className={`rounded-2xl border-2 px-4 py-3 text-xl sm:text-2xl font-bold text-left
                      transition-all duration-200 font-body text-white ${cls}`}>
                    <span className="mr-1 text-white/40">{String.fromCharCode(65+i)}.</span>
                    {opt.text}
                    {status !== 'idle' && opt.correct && <CheckCircle2 size={14} className="text-jade inline ml-1" />}
                  </motion.button>
                )
              })}
            </div>

            <AnimatePresence>
              {status !== 'idle' && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={`mb-3 flex items-center gap-3 p-3 rounded-2xl border text-base font-bold
                    ${status === 'correct' ? 'border-jade bg-jade/10 text-jade' : 'border-red-400 bg-red-400/10 text-red-300'}`}>
                  {status === 'correct'
                    ? <><CheckCircle2 size={18} /> ✅ Tama! Isang tile ang na-reveal! +{game.POINTS.puzzleCorrect} pts</>
                    : <><XCircle size={18} /> ❌ Mali! Subukan muli sa susunod na tanong.</>}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {status !== 'idle' && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="pt-1 flex justify-center">
                  <button onClick={next} className="btn-teal flex items-center gap-2">
                    {qIdx + 1 >= PUZZLE_QUESTIONS.length ? 'Tapusin ang Puzzle' : 'Susunod na Tanong'}
                    <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  )
}
