import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MonitorUp, MonitorDown } from 'lucide-react'
import { useGame }       from './hooks/useGame'
import ScoreBar          from './components/ScoreBar'
import HomeScreen        from './components/HomeScreen'
import VocabGame         from './components/VocabGame'
import CharacterGame     from './components/CharacterGame'
import PuzzleReveal      from './components/PuzzleReveal'
import StoryOrder        from './components/StoryOrder'
import FinalScreen       from './components/FinalScreen'
import { useSound }      from './hooks/useSound'

// ── Screen index → component map ────────────────────────
//    0 = Home  (no score bar)
//    1 = Vocab
//    2 = Characters
//    3 = Puzzle
//    4 = Story Order
//    5 = Final
const SCREENS = [
  HomeScreen,
  VocabGame,
  CharacterGame,
  PuzzleReveal,
  StoryOrder,
  FinalScreen,
]

// ── Page transition variants ─────────────────────────────
const pageVariants = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.45, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.25, ease: 'easeIn'  } },
}

export default function App() {
  const game           = useGame()
  const starsRef       = useRef(null)
  const ActiveScreen   = SCREENS[game.screen]
  const sound          = useSound()
  const [musicOn, setMusicOn] = useState(() => {
    try {
      const saved = window.localStorage.getItem('adarna_music_on')
      return saved === null ? true : saved === '1'
    } catch {
      return true
    }
  })
  const [classroomMode, setClassroomMode] = useState(() => {
    try {
      return window.localStorage.getItem('adarna_classroom_mode') === '1'
    } catch {
      return false
    }
  })

  // ── Generate starfield once on mount ──────────────────
  useEffect(() => {
    const bg = starsRef.current
    if (!bg) return
    for (let i = 0; i < 90; i++) {
      const star = document.createElement('div')
      const size = 1 + Math.random() * 2.5
      star.className = 'star-particle'
      star.style.cssText = `
        width:  ${size}px;
        height: ${size}px;
        left:   ${Math.random() * 100}%;
        top:    ${Math.random() * 100}%;
        animation-delay:    ${-(Math.random() * 5).toFixed(2)}s;
        animation-duration: ${(2 + Math.random() * 4).toFixed(2)}s;
        opacity: ${(0.2 + Math.random() * 0.8).toFixed(2)};
      `
      bg.appendChild(star)
    }
  }, [])

  useEffect(() => {
    if (musicOn) sound.startBgm()
    const unlock = () => {
      if (musicOn) sound.startBgm()
    }
    window.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('keydown', unlock, { once: true })
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
      sound.stopBgm()
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem('adarna_music_on', musicOn ? '1' : '0')
    } catch {
      // ignore storage errors
    }
    if (musicOn) sound.startBgm()
    else sound.stopBgm()
  }, [musicOn])

  useEffect(() => {
    try {
      window.localStorage.setItem('adarna_classroom_mode', classroomMode ? '1' : '0')
    } catch {
      // ignore storage errors
    }

    const root = document.documentElement
    if (classroomMode) root.classList.add('classroom-mode')
    else root.classList.remove('classroom-mode')

    return () => root.classList.remove('classroom-mode')
  }, [classroomMode])

  return (
    <div className="relative h-screen overflow-hidden">

      {/* ── Starfield background ── */}
      <div
        ref={starsRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, #2d0b55 0%, #1a0a2e 60%, #0a0015 100%)' }}
      />

      {/* ── App content ── */}
      <div className="relative z-10 h-full w-full max-w-[min(99vw,1920px)] mx-auto px-2 sm:px-4 lg:px-6 py-1.5 sm:py-2 flex flex-col">
        <button
          type="button"
          onClick={() => {
            sound.playClick()
            setClassroomMode(v => !v)
          }}
          className="absolute right-3 top-3 z-20 rounded-full border border-gold/40 bg-deep/70 px-3 py-1.5 text-xs sm:text-sm text-gold flex items-center gap-1.5 hover:border-gold/70 transition-colors"
          title={classroomMode ? 'Patayin ang classroom view' : 'Buksan ang classroom view'}
        >
          {classroomMode ? <MonitorDown size={14} /> : <MonitorUp size={14} />}
          {classroomMode ? 'Classroom On' : 'Classroom Off'}
        </button>

        {/* Score bar — hidden on home & final */}
        {game.screen > 0 && game.screen < 5 && (
          <ScoreBar
            score={game.score}
            section={game.screen}
            tilesRevealed={game.tilesRevealed}
            totalTiles={game.totalTiles}
            musicOn={musicOn}
            onToggleMusic={() => {
              sound.playClick()
              setMusicOn(v => !v)
            }}
          />
        )}

        {/* Animated screen transitions */}
        <div className="flex-1 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={game.screen}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="h-full min-h-0"
            >
              <ActiveScreen game={game} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
