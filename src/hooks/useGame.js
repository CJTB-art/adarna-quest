import { useState, useCallback } from 'react'
import { VOCAB_WORDS, CHAR_QUESTIONS, PUZZLE_QUESTIONS } from '../data/gameData'

// ── Points per action ────────────────────────────────────
// Edit these to adjust scoring
const POINTS = {
  vocabCorrect:     20,
  charCorrect:      25,
  puzzleCorrect:    15,
  orderCorrect:     50,
}

const TOTAL_TILES = 16   // must match PuzzleReveal grid size

const initialState = {
  screen:        0,    // 0=Home 1=Vocab 2=Chars 3=Puzzle 4=Order 5=Final
  score:         0,
  tilesRevealed: 0,
  totalTiles:    TOTAL_TILES,
  achievements:  [],   // earned badge keys
}

function getCheckpointState(screen) {
  let score = 0
  let tilesRevealed = 0

  if (screen >= 2) {
    score += VOCAB_WORDS.length * POINTS.vocabCorrect
    tilesRevealed += VOCAB_WORDS.length
  }
  if (screen >= 3) {
    score += CHAR_QUESTIONS.length * POINTS.charCorrect
    tilesRevealed += CHAR_QUESTIONS.length
  }
  if (screen >= 4) {
    score += PUZZLE_QUESTIONS.length * POINTS.puzzleCorrect
    tilesRevealed += PUZZLE_QUESTIONS.length
  }

  return {
    score,
    tilesRevealed: Math.min(tilesRevealed, TOTAL_TILES),
  }
}

export function useGame() {
  const [state, setState] = useState(initialState)

  // ── Navigate to a screen ────────────────────────────
  const goTo = useCallback((screen) => {
    setState(s => ({ ...s, screen }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Start directly at a chosen section from home while aligning base progress.
  const startAtSection = useCallback((screen) => {
    const checkpoint = getCheckpointState(screen)
    setState(s => ({
      ...s,
      screen,
      score: checkpoint.score,
      tilesRevealed: checkpoint.tilesRevealed,
      achievements: [],
    }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // ── Add score points ────────────────────────────────
  const addScore = useCallback((type) => {
    const pts = POINTS[type] ?? 0
    setState(s => ({ ...s, score: s.score + pts }))
    return pts
  }, [])

  // ── Reveal one puzzle tile ──────────────────────────
  const revealTile = useCallback(() => {
    setState(s => ({
      ...s,
      tilesRevealed: Math.min(s.tilesRevealed + 1, TOTAL_TILES),
    }))
  }, [])

  // ── Earn an achievement badge ───────────────────────
  const earnBadge = useCallback((key) => {
    setState(s =>
      s.achievements.includes(key)
        ? s
        : { ...s, achievements: [...s.achievements, key] }
    )
  }, [])

  // ── Full reset ──────────────────────────────────────
  const reset = useCallback(() => {
    setState(initialState)
  }, [])

  return {
    ...state,
    goTo,
    startAtSection,
    addScore,
    revealTile,
    earnBadge,
    reset,
    POINTS,
  }
}
