import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGame }       from './hooks/useGame'
import ScoreBar          from './components/ScoreBar'
import HomeScreen        from './components/HomeScreen'
import VocabGame         from './components/VocabGame'
import CharacterGame     from './components/CharacterGame'
import PuzzleReveal      from './components/PuzzleReveal'
import StoryOrder        from './components/StoryOrder'
import FinalScreen       from './components/FinalScreen'

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

  return (
    <div className="relative h-screen overflow-hidden">

      {/* ── Starfield background ── */}
      <div
        ref={starsRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, #2d0b55 0%, #1a0a2e 60%, #0a0015 100%)' }}
      />

      {/* ── App content ── */}
      <div className="relative z-10 h-full w-full max-w-[min(99vw,1920px)] mx-auto px-3 sm:px-5 lg:px-8 py-2 sm:py-3 flex flex-col">

        {/* Score bar — hidden on home & final */}
        {game.screen > 0 && game.screen < 5 && (
          <ScoreBar
            score={game.score}
            section={game.screen}
            tilesRevealed={game.tilesRevealed}
            totalTiles={game.totalTiles}
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
              className="h-full"
            >
              <ActiveScreen game={game} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
