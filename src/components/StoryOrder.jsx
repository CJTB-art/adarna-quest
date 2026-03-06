import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion, AnimatePresence } from 'framer-motion'
import { BookMarked, GripVertical, CheckCircle2, XCircle, RotateCcw, CheckCheck } from 'lucide-react'
import { useSound } from '../hooks/useSound'
import { STORY_EVENTS } from '../data/gameData'

// ── Shuffle helper ───────────────────────────────────────
function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── Make items with stable id + original correct index ──
function makeItems(events) {
  return shuffleArray(
    events.map((text, correctIdx) => ({ id: `evt-${correctIdx}`, text, correctIdx }))
  )
}

// ── Sortable single event row ────────────────────────────
function SortableEvent({ item, position, result }) {
  const {
    attributes, listeners, setNodeRef,
    transform, transition, isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : undefined,
    opacity: isDragging ? 0.5 : 1,
  }

  let borderColor = 'border-white/15'
  let bgColor     = 'bg-white/5'
  if (result === 'correct') { borderColor = 'border-jade';    bgColor = 'bg-jade/10'    }
  if (result === 'wrong')   { borderColor = 'border-red-400'; bgColor = 'bg-red-400/10' }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-start gap-2.5 rounded-2xl border-2 p-3
        ${borderColor} ${bgColor}
        transition-colors duration-200
        ${isDragging ? 'shadow-2xl shadow-gold/20' : ''}
      `}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="text-white/30 hover:text-gold transition-colors mt-0.5 flex-shrink-0 cursor-grab active:cursor-grabbing"
      >
        <GripVertical size={20} />
      </button>

      {/* Position number */}
      <div className={`
        w-9 h-9 rounded-full flex items-center justify-center
        font-bold text-sm sm:text-base flex-shrink-0 mt-0.5
        ${result === 'correct' ? 'bg-jade/20 text-jade border-2 border-jade'
        : result === 'wrong'   ? 'bg-red-400/20 text-red-300 border-2 border-red-400'
        :                        'bg-gold/10 text-gold border-2 border-gold/40'}
      `}>
        {position + 1}
      </div>

      {/* Text */}
      <p className="text-white/90 text-sm sm:text-base leading-relaxed flex-1">{item.text}</p>

      {/* Status icon */}
      {result === 'correct' && <CheckCircle2 size={18} className="text-jade flex-shrink-0 mt-0.5" />}
      {result === 'wrong'   && <XCircle      size={18} className="text-red-400 flex-shrink-0 mt-0.5" />}
    </div>
  )
}

// ── Main component ───────────────────────────────────────
export default function StoryOrder({ game }) {
  const [items,   setItems]   = useState(() => makeItems(STORY_EVENTS))
  const [results, setResults] = useState([])  // 'correct' | 'wrong' per position
  const [checked, setChecked] = useState(false)
  const [allOk,   setAllOk]   = useState(false)
  const sound = useSound()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  function handleDragEnd(event) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setItems(items => {
        const oldIdx = items.findIndex(i => i.id === active.id)
        const newIdx = items.findIndex(i => i.id === over.id)
        return arrayMove(items, oldIdx, newIdx)
      })
    }
    // Clear checked state when order changes
    setChecked(false)
    setResults([])
    setAllOk(false)
  }

  function checkOrder() {
    sound.playClick()
    const res = items.map((item, pos) => item.correctIdx === pos ? 'correct' : 'wrong')
    setResults(res)
    setChecked(true)
    const ok = res.every(r => r === 'correct')
    setAllOk(ok)
    if (ok) {
      sound.playFanfare()
      game.addScore('orderCorrect')
      setTimeout(() => game.goTo(5), 2000)
    }
  }

  function reset() {
    sound.playClick()
    setItems(makeItems(STORY_EVENTS))
    setResults([])
    setChecked(false)
    setAllOk(false)
  }

  return (
    <div className="h-full glass-card p-4 sm:p-5 lg:p-6 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <BookMarked size={22} className="text-amber" />
        <h2 className="font-display text-gold text-2xl sm:text-3xl">Ayusin ang Kwento</h2>
      </div>
      <p className="text-white/70 text-base sm:text-lg mb-3">
        I-drag ang mga pangyayari para ayusin sa tamang pagkakasunud-sunod.
      </p>

      {/* Instruction */}
      <div className="rounded-2xl border border-gold/20 bg-gold/5 px-4 py-2.5 mb-3 flex items-start gap-2.5">
        <GripVertical size={16} className="text-gold flex-shrink-0 mt-0.5" />
        <p className="text-white/80 text-sm sm:text-base leading-relaxed">
          <span className="text-gold font-bold">Tip:</span>{' '}
          Hawakan ang <span className="text-gold">grip icon</span> sa kaliwa ng bawat kahon,
          tapos i-drag papunta sa tamang posisyon.
        </p>
      </div>

      {/* Sortable list */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2 mb-3 flex-1 min-h-0 overflow-y-auto pr-1">
            {items.map((item, pos) => (
              <SortableEvent
                key={item.id}
                item={item}
                position={pos}
                result={results[pos] ?? null}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Result feedback */}
      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-3 rounded-3xl p-4 border flex items-start gap-3
              ${allOk
                ? 'border-jade bg-jade/10'
                : 'border-red-400 bg-red-400/10'}`}
          >
            {allOk
              ? <CheckCircle2 size={22} className="text-jade flex-shrink-0 mt-0.5" />
              : <XCircle      size={22} className="text-red-400 flex-shrink-0 mt-0.5" />
            }
            <div>
              <p className="font-bold text-base sm:text-lg">
                {allOk
                  ? 'Tama! Perpektong pagkakasunud-sunod! Papunta na sa Final Screen...'
                  : 'Hindi pa tama. Ang mga pulang kahon ay nasa maling posisyon. Subukan muli!'
                }
              </p>
              {!allOk && (
                <p className="text-white/70 text-sm sm:text-base mt-1">
                  {results.filter(r => r === 'correct').length} sa {STORY_EVENTS.length} ang tama.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <div className="flex gap-3 justify-center flex-wrap">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="btn-purple flex items-center gap-2 text-base px-6 py-3"
        >
          <RotateCcw size={16} />
          I-shuffle Muli
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={checkOrder}
          className="btn-gold flex items-center gap-2"
        >
          <CheckCheck size={18} />
          Suriin ang Sagot
        </motion.button>
      </div>

    </div>
  )
}
