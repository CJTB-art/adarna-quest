import { useEffect, useState } from 'react'

const COLS = 4
const ROWS = 4
const PRIMARY_IMAGE = '/images/adarna/ibong-adarna-hero.png'
const FALLBACK_IMAGE = '/images/adarna/ibong-adarna-hero.png'

// Keep center tiles hidden longer so the bird is revealed later.
const REVEAL_ORDER = [0, 1, 2, 3, 4, 7, 8, 11, 12, 13, 14, 15, 5, 6, 9, 10]
const REVEALED_BY_STEP = REVEAL_ORDER.reduce((acc, tileIndex, step) => {
  acc[tileIndex] = step
  return acc
}, {})

export default function AdarnaPuzzleImage({ tilesRevealed = 0, totalTiles = 16 }) {
  const [imgSrc, setImgSrc] = useState(PRIMARY_IMAGE)

  useEffect(() => {
    setImgSrc(PRIMARY_IMAGE)
  }, [])

  const tileCount = COLS * ROWS
  const unlocked = Math.min(tilesRevealed, tileCount)
  const tiles = []

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const index = row * COLS + col
      const revealStep = REVEALED_BY_STEP[index] ?? index
      const revealed = revealStep < unlocked

      tiles.push(
        <div
          key={index}
          className="relative aspect-square overflow-hidden border border-[#1b0a34]"
        >
          <img
            src={imgSrc}
            alt=""
            aria-hidden="true"
            className="absolute pointer-events-none select-none max-w-none"
            style={{
              width: `${COLS * 100}%`,
              height: `${ROWS * 100}%`,
              left: `-${col * 100}%`,
              top: `-${row * 100}%`,
              animation: revealed ? 'tileReveal 0.45s ease-out both' : 'none',
            }}
          />

          {!revealed && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'rgba(20,5,50,0.95)' }}
            >
              <span className="text-white/30 text-2xl select-none">🔒</span>
            </div>
          )}
        </div>
      )
    }
  }

  return (
    <>
      <style>{`
        @keyframes tileReveal {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {tilesRevealed >= totalTiles && (
        <div className="mb-2">
          <img
            src={imgSrc}
            alt="Ibong Adarna puzzle complete"
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            className="rounded-2xl border-2 border-gold/40 w-full max-w-[min(90vw,560px)] mx-auto block object-cover"
            style={{ boxShadow: '0 0 60px rgba(255,215,0,0.3)' }}
          />
          <p className="text-center text-gold/80 text-sm sm:text-base mt-2 font-display">Ang Ibong Adarna</p>
        </div>
      )}

      {tilesRevealed < totalTiles && (
        <div
          className="grid gap-0 w-full max-w-[min(90vw,560px)] mx-auto mb-1.5 rounded-2xl border border-gold/25 overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            background: 'rgba(0,0,0,0.4)',
          }}
        >
          {tiles}
        </div>
      )}
    </>
  )
}
