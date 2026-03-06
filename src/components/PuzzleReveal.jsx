import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Grid2x2, RotateCcw, Sparkles } from 'lucide-react'
import { useSound } from '../hooks/useSound'

const COLS = 4
const ROWS = 4
const TOTAL_TILES = COLS * ROWS
const PUZZLE_IMAGE = '/images/adarna/ibong-adarna-hero.png'

function shuffledPieces() {
  const pieces = Array.from({ length: TOTAL_TILES }, (_, i) => ({
    id: `piece-${i}`,
    correctIndex: i,
  }))

  for (let i = pieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pieces[i], pieces[j]] = [pieces[j], pieces[i]]
  }

  return pieces
}

function PieceFace({ piece }) {
  const row = Math.floor(piece.correctIndex / COLS)
  const col = piece.correctIndex % COLS

  return (
    <img
      src={PUZZLE_IMAGE}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none max-w-none"
      style={{
        width: `${COLS * 100}%`,
        height: `${ROWS * 100}%`,
        left: `-${col * 100}%`,
        top: `-${row * 100}%`,
      }}
    />
  )
}

function DraggablePiece({ piece, activeId }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: piece.id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`relative h-full w-full rounded-xl border border-gold/30 overflow-hidden touch-none ${
        isDragging || activeId === piece.id ? 'opacity-25' : ''
      }`}
    >
      <PieceFace piece={piece} />
    </div>
  )
}

function DropCell({ index, piece, activeId }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${index}`,
    data: { index },
  })

  return (
    <div
      ref={setNodeRef}
      className={`relative aspect-square rounded-xl transition-all ${isOver ? 'ring-2 ring-teal/80' : ''}`}
    >
      <DraggablePiece piece={piece} activeId={activeId} />
    </div>
  )
}

export default function PuzzleReveal() {
  const sound = useSound()
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const [pieces, setPieces] = useState(() => shuffledPieces())
  const [moves, setMoves] = useState(0)
  const [activeId, setActiveId] = useState(null)

  const solved = useMemo(
    () => pieces.every((piece, index) => piece.correctIndex === index),
    [pieces],
  )

  const activePiece = activeId ? pieces.find((p) => p.id === activeId) : null

  function reshuffle() {
    sound.playClick()
    setPieces(shuffledPieces())
    setMoves(0)
    setActiveId(null)
  }

  function onDragStart(event) {
    if (solved) return
    setActiveId(event.active.id)
  }

  function onDragCancel() {
    setActiveId(null)
  }

  function onDragEnd(event) {
    const { active, over } = event
    setActiveId(null)

    if (!over || solved) return
    if (typeof over.id !== 'string' || !over.id.startsWith('slot-')) return

    const fromIndex = pieces.findIndex((p) => p.id === active.id)
    const toIndex = over.data?.current?.index

    if (fromIndex < 0 || toIndex == null || fromIndex === toIndex) return

    setPieces((prev) => {
      const next = [...prev]
      ;[next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]]
      const willSolve = next.every((piece, index) => piece.correctIndex === index)
      setMoves((m) => m + 1)
      sound.playClick()
      if (willSolve) sound.playFanfare()
      return next
    })
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-start overflow-hidden pt-1 sm:pt-2">
      <div className="w-full h-full glass-card px-1.5 sm:px-2 py-1.5 sm:py-2">

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={onDragStart}
          onDragCancel={onDragCancel}
          onDragEnd={onDragEnd}
        >
          <div className="h-full min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(250px,0.28fr)] gap-1.5">
            <div className="order-2 lg:order-1 h-full min-h-0 flex items-center justify-center">
              <div className="h-full max-h-[calc(100vh-78px)] aspect-square w-auto max-w-full rounded-2xl border border-gold/35 bg-deep/70 p-0.5 sm:p-1">
                <div
                  className="grid grid-cols-4 gap-0.5 sm:gap-1 h-full w-full"
                >
                  {pieces.map((piece, index) => (
                    <DropCell key={`slot-${index}`} index={index} piece={piece} activeId={activeId} />
                  ))}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 h-full min-h-0 flex flex-col gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <Grid2x2 size={24} className="text-teal" />
                  <h1 className="font-display text-gold text-[clamp(1.55rem,2.4vw,2.6rem)]">Ibong Adarna Puzzle</h1>
                </div>
                <p className="text-white/75 text-sm mt-0.5">I-drag ang mga piraso para mabuo ang larawan.</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="glass-card px-3 py-2 text-center min-w-[92px]">
                  <div className="font-display text-xl text-teal leading-none">{moves}</div>
                  <div className="text-white/60 text-[10px] uppercase tracking-widest">Moves</div>
                </div>
                <button onClick={reshuffle} className="btn-purple !px-4 !py-2 flex items-center gap-2">
                  <RotateCcw size={16} />
                  Shuffle
                </button>
              </div>

              <div className="rounded-2xl border border-gold/25 bg-gold/5 p-3 text-white/80">
                <p className="text-base font-bold text-gold mb-1">Paano Laruin</p>
                <p className="text-sm leading-relaxed">
                  I-drag ang isang tile at i-drop sa ibang tile para magpalit sila ng puwesto.
                </p>
              </div>

              <div className="rounded-2xl border border-gold/25 bg-gold/5 p-3">
                <p className="text-base font-bold text-gold mb-1">Status</p>
                <p className={`text-sm leading-relaxed ${solved ? 'text-jade' : 'text-white/80'}`}>
                  {solved ? 'Magaling! Nabuo mo ang Ibong Adarna puzzle!' : 'Tip: Simulan sa mga gilid at kanto para mas mabilis.'}
                </p>
              </div>

              <motion.div
                initial={false}
                animate={{ opacity: solved ? 1 : 0.8, y: solved ? 0 : 2 }}
                className={`mt-auto min-h-[44px] rounded-2xl border px-3 py-1.5 text-center text-xs sm:text-sm font-bold ${
                  solved ? 'border-jade bg-jade/10 text-jade' : 'border-gold/25 bg-gold/5 text-white/80'
                }`}
              >
                {solved ? 'Kompleto na ang puzzle.' : 'Ayusin ang buong larawan para manalo.'}
              </motion.div>
            </div>
          </div>

          <DragOverlay>
            {activePiece ? (
              <div
                className="relative rounded-xl border border-gold/40 overflow-hidden shadow-2xl shadow-gold/40"
                style={{ width: 'clamp(90px, 19vw, 220px)', height: 'clamp(90px, 19vw, 220px)' }}
              >
                <PieceFace piece={activePiece} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {solved && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[60] bg-[#120322]/90 backdrop-blur-sm flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 14 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="w-full max-w-3xl glass-card border-jade/40 p-8 sm:p-10 text-center"
            >
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-jade/15 border border-jade/40 mb-5">
                <Sparkles size={38} className="text-jade" />
              </div>
              <h2 className="font-display text-gold text-4xl sm:text-5xl mb-3">
                Magaling!
              </h2>
              <p className="text-jade text-2xl sm:text-3xl font-bold mb-2">
                Nabuo mo ang Ibong Adarna Puzzle!
              </p>
              <p className="text-white/75 text-base sm:text-lg mb-7">
                Nais mo bang ulitin ang challenge?
              </p>
              <button
                onClick={reshuffle}
                className="btn-gold !px-10 !py-3.5 text-lg flex items-center gap-2 mx-auto"
              >
                <RotateCcw size={18} />
                Maglaro Muli
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
