import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PuzzleReveal      from './components/PuzzleReveal'
import { useSound }      from './hooks/useSound'

// ── Page transition variants ─────────────────────────────
const pageVariants = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.45, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.25, ease: 'easeIn'  } },
}

export default function App() {
  const starsRef       = useRef(null)
  const sound          = useSound()
  const [musicOn, setMusicOn] = useState(() => {
    try {
      const saved = window.localStorage.getItem('adarna_music_on')
      return saved === null ? true : saved === '1'
    } catch {
      return true
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
    const root = document.documentElement
    root.classList.add('classroom-mode')

    return () => root.classList.remove('classroom-mode')
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
      <div className="relative z-10 h-full w-full max-w-[99.6vw] mx-auto px-1 sm:px-2 py-1 sm:py-1.5 flex flex-col">
        {/* Animated screen transitions */}
        <div className="flex-1 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key="puzzle-only"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="h-full min-h-0"
            >
              <PuzzleReveal />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
