import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Grid2x2, RotateCcw, Sparkles } from "lucide-react";
import { useSound } from "../hooks/useSound";

const COLS = 4;
const ROWS = 4;
const TOTAL_TILES = COLS * ROWS;
const PUZZLE_IMAGE = "/images/adarna/ibong-adarna-hero.png";

const STORY_CARDS = [
  {
    id: "scene-1",
    correctIndex: 0,
    image: "/images/adarna p2/1.png",
    description:
      "Naabutan ng mahiwagang lobo si Don Juan na ang katawan ay lunung-luno sa sugat.",
  },
  {
    id: "scene-2",
    correctIndex: 1,
    image: "/images/adarna p2/2.png",
    description:
      "Bawat pasa at sugat ni Don Juan ay pinahiran at ginamot ng mahiwagang lobo.",
  },
  {
    id: "scene-3",
    correctIndex: 2,
    image: "/images/adarna p2/3.png",
    description:
      "Nang magamot na si Don Juan ng mahiwagang lobo, biglang nanumbalik ang kaniyang lakas.",
  },
  {
    id: "scene-4",
    correctIndex: 3,
    image: "/images/adarna p2/4.png",
    description:
      "Habang nalulungkot si Don Juan, dumating ang Ibong Adarna at agad siyang nakilala nito.",
  },
  {
    id: "scene-5",
    correctIndex: 4,
    image: "/images/adarna p2/5.png",
    description:
      "Nagpahinga si Don Juan sa kabundukan at pinayuhan siya ng Ibong Adarna na kalimutan si Donya Leonora at hanapin si Donya Maria Blanca.",
  },
  {
    id: "scene-6",
    correctIndex: 5,
    image: "/images/adarna p2/6.png",
    description:
      "Nagpatuloy sa paglalakbay si Don Juan at nakakita siya ng isang ermitanyo kung saan siya ay nanlimos.",
  },
  {
    id: "scene-7",
    correctIndex: 6,
    image: "/images/adarna p2/7.png",
    description:
      "Naglakbay muli si Don Juan at inabot ng limang buwan ang kaniyang paglalakbay.",
  },
  {
    id: "scene-8",
    correctIndex: 7,
    image: "/images/adarna p2/8.png",
    description:
      "Sa kaniyang paglalakbay, nakarating siya sa ikalimang ermitanyo na nag-utos sa kaniyang hirang na olikornyo upang ihatid si Don Juan sa kaniyang patutunguhan.",
  },
  {
    id: "scene-9",
    correctIndex: 8,
    image: "/images/adarna p2/9.png",
    description:
      "Nakita rin ni Don Juan ang ikalimang ermitanyo at isang agila na tutulong sa kaniya upang marating ang Reino de los Cristales.",
  },
  {
    id: "scene-10",
    correctIndex: 9,
    image: "/images/adarna p2/10.png",
    description:
      "Inihanda ang agila upang ihatid si Don Juan sa kaniyang pupuntahan.",
  },
  {
    id: "scene-11",
    correctIndex: 10,
    image: "/images/adarna p2/11.png",
    description:
      "Dahil sa tulong ng ermitanyo at ng agila, narating ni Don Juan ang Reino de los Cristales at nakita si Donya Maria Blanca.",
  },
  {
    id: "scene-12",
    correctIndex: 11,
    image: "/images/adarna p2/12.png",
    description:
      "Dahil sa paghanga, kinuha ni Don Juan ang damit ni Donya Maria Blanca, ngunit napatawad siya nito nang siya ay magpakumbaba at umamin sa kaniyang pagkakamali.",
  },
];

const PART_TWO_SLOT_ORDER = [0, 1, 2, 3, 7, 6, 5, 4, 8, 9, 10, 11];

function shuffledPieces() {
  const pieces = Array.from({ length: TOTAL_TILES }, (_, i) => ({
    id: `piece-${i}`,
    correctIndex: i,
  }));

  for (let i = pieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
  }

  return pieces;
}

function shuffleCards() {
  const cards = [...STORY_CARDS];

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  if (cards.every((card, index) => card.correctIndex === index)) {
    [cards[0], cards[1]] = [cards[1], cards[0]];
  }

  return cards;
}

function PieceFace({ piece }) {
  const row = Math.floor(piece.correctIndex / COLS);
  const col = piece.correctIndex % COLS;

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
  );
}

function DraggablePiece({ piece, activeId }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: piece.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`relative h-full w-full overflow-hidden rounded-xl border border-gold/30 touch-none ${
        isDragging || activeId === piece.id ? "opacity-25" : ""
      }`}
    >
      <PieceFace piece={piece} />
    </div>
  );
}

function TileDropCell({ index, piece, activeId }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `part1-slot-${index}`,
    data: { index },
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative aspect-square rounded-xl transition-all ${isOver ? "ring-2 ring-teal/80" : ""}`}
    >
      <DraggablePiece piece={piece} activeId={activeId} />
    </div>
  );
}

function StoryCardFace({ card }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[0.35rem] bg-black">
      <div className="relative h-full w-full overflow-hidden bg-black">
        <img
          src={card.image}
          alt={card.description}
          className="absolute inset-0 h-full w-full object-contain p-0"
          draggable="false"
        />
      </div>
    </div>
  );
}

function DraggableStoryCard({ card, activeId, onPreview }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: card.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => {
        if (!isDragging) onPreview(card);
      }}
      className={`relative h-full w-full touch-none outline-none ${
        isDragging || activeId === card.id ? "opacity-25" : ""
      }`}
    >
      <StoryCardFace card={card} />
    </div>
  );
}

function StoryDropSlot({ index, card, activeId, onPreview }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `part2-slot-${index}`,
    data: { index },
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative h-full min-h-0 transition-transform ${
        isOver ? "scale-[1.02]" : ""
      }`}
    >
      <DraggableStoryCard
        card={card}
        activeId={activeId}
        onPreview={onPreview}
      />
    </div>
  );
}

function PartOnePuzzle({ onNext }) {
  const sound = useSound();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const [pieces, setPieces] = useState(() => shuffledPieces());
  const [moves, setMoves] = useState(0);
  const [activeId, setActiveId] = useState(null);

  const solved = useMemo(
    () => pieces.every((piece, index) => piece.correctIndex === index),
    [pieces],
  );

  const activePiece = activeId ? pieces.find((p) => p.id === activeId) : null;

  function reshuffle() {
    sound.playClick();
    setPieces(shuffledPieces());
    setMoves(0);
    setActiveId(null);
  }

  function onDragStart(event) {
    if (solved) return;
    setActiveId(event.active.id);
  }

  function onDragCancel() {
    setActiveId(null);
  }

  function onDragEnd(event) {
    const { active, over } = event;
    setActiveId(null);

    if (!over || solved) return;
    if (typeof over.id !== "string" || !over.id.startsWith("part1-slot-"))
      return;

    const fromIndex = pieces.findIndex((p) => p.id === active.id);
    const toIndex = over.data?.current?.index;

    if (fromIndex < 0 || toIndex == null || fromIndex === toIndex) return;

    setPieces((prev) => {
      const next = [...prev];
      [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
      const willSolve = next.every(
        (piece, index) => piece.correctIndex === index,
      );
      setMoves((m) => m + 1);
      sound.playClick();
      if (willSolve) sound.playFanfare();
      return next;
    });
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
            <div className="order-2 lg:order-1 h-full min-h-0 flex items-stretch justify-center">
              <div className="h-full aspect-square w-auto max-w-full rounded-2xl border border-gold/35 bg-deep/70 p-0.5 sm:p-1">
                <div className="grid grid-cols-4 gap-0.5 sm:gap-1 h-full w-full">
                  {pieces.map((piece, index) => (
                    <TileDropCell
                      key={`part1-slot-${index}`}
                      index={index}
                      piece={piece}
                      activeId={activeId}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 h-full min-h-0 flex flex-col gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <Grid2x2 size={24} className="text-teal" />
                  <h1 className="font-display text-gold text-[clamp(1.55rem,2.4vw,2.6rem)]">
                    Ibong Adarna Puzzle
                  </h1>
                </div>
                <p className="text-white/75 text-sm mt-0.5">
                  I-drag ang mga piraso para mabuo ang larawan.
                </p>
              </div>

              <div className="grid grid-cols-[minmax(92px,auto)_1fr] gap-2">
                <div className="glass-card px-3 py-2 text-center min-w-[92px]">
                  <div className="font-display text-xl text-teal leading-none">
                    {moves}
                  </div>
                  <div className="text-white/60 text-[10px] uppercase tracking-widest">
                    Moves
                  </div>
                </div>
                <button
                  onClick={reshuffle}
                  className="btn-purple !px-4 !py-2 flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} />
                  Shuffle
                </button>
                <button
                  onClick={onNext}
                  className="btn-gold col-span-2 !px-4 !py-2"
                >
                  Buksan ang Part 2
                </button>
              </div>

              <div className="rounded-2xl border border-gold/25 bg-gold/5 p-3 text-white/80">
                <p className="text-base font-bold text-gold mb-1">
                  Paano Laruin
                </p>
                <p className="text-sm leading-relaxed">
                  I-drag ang isang tile at i-drop sa ibang tile para magpalit
                  sila ng puwesto.
                </p>
              </div>

              <div className="rounded-2xl border border-gold/25 bg-gold/5 p-3">
                <p className="text-base font-bold text-gold mb-1">Status</p>
                <p
                  className={`text-sm leading-relaxed ${solved ? "text-jade" : "text-white/80"}`}
                >
                  {solved
                    ? "Magaling! Nabuo nyo ang Ibong Adarna puzzle!"
                    : "Tip: Simulan sa mga gilid at kanto para mas mabilis."}
                </p>
              </div>

              <motion.div
                initial={false}
                animate={{ opacity: solved ? 1 : 0.8, y: solved ? 0 : 2 }}
                className={`mt-auto min-h-[44px] rounded-2xl border px-3 py-1.5 text-center text-xs sm:text-sm font-bold ${
                  solved
                    ? "border-jade bg-jade/10 text-jade"
                    : "border-gold/25 bg-gold/5 text-white/80"
                }`}
              >
                {solved
                  ? "Kompleto na ang puzzle."
                  : "Ayusin ang buong larawan para manalo."}
              </motion.div>
            </div>
          </div>

          <DragOverlay>
            {activePiece ? (
              <div
                className="relative rounded-xl border border-gold/40 overflow-hidden shadow-2xl shadow-gold/40"
                style={{
                  width: "clamp(90px, 19vw, 220px)",
                  height: "clamp(90px, 19vw, 220px)",
                }}
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
                Handa ka na ba sa Part 2?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onNext}
                  className="btn-gold !px-10 !py-3.5 text-lg"
                >
                  Part 2
                </button>
                <button
                  onClick={reshuffle}
                  className="btn-purple !px-8 !py-3 text-base flex items-center gap-2"
                >
                  <RotateCcw size={18} />
                  Maglaro Muli
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function PartTwoPuzzle() {
  const sound = useSound();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const [cards, setCards] = useState(() => shuffleCards());
  const [activeId, setActiveId] = useState(null);
  const [previewCard, setPreviewCard] = useState(null);

  const solved = useMemo(
    () =>
      cards.every(
        (card, index) => card.correctIndex === PART_TWO_SLOT_ORDER[index],
      ),
    [cards],
  );

  const activeCard = activeId
    ? cards.find((card) => card.id === activeId)
    : null;

  useEffect(() => {
    if (!previewCard) return;

    function onKeyDown(event) {
      if (event.key === "Escape") setPreviewCard(null);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewCard]);

  function reshuffle() {
    sound.playClick();
    setCards(shuffleCards());
    setActiveId(null);
    setPreviewCard(null);
  }

  function onDragStart(event) {
    if (solved) return;
    setActiveId(event.active.id);
  }

  function onDragCancel() {
    setActiveId(null);
  }

  function onDragEnd(event) {
    const { active, over } = event;
    setActiveId(null);

    if (!over || solved) return;
    if (typeof over.id !== "string" || !over.id.startsWith("part2-slot-"))
      return;

    const fromIndex = cards.findIndex((card) => card.id === active.id);
    const toIndex = over.data?.current?.index;

    if (fromIndex < 0 || toIndex == null || fromIndex === toIndex) return;

    setCards((prev) => {
      const next = [...prev];
      [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
      const willSolve = next.every(
        (card, index) => card.correctIndex === PART_TWO_SLOT_ORDER[index],
      );
      sound.playClick();
      if (willSolve) sound.playFanfare();
      return next;
    });
  }

  return (
    <div className="relative -mx-1 -my-1 h-[calc(100%+0.5rem)] w-[calc(100%+0.5rem)] overflow-hidden sm:-mx-2 sm:-my-[0.375rem] sm:h-[calc(100%+0.75rem)] sm:w-[calc(100%+1rem)]">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragCancel={onDragCancel}
        onDragEnd={onDragEnd}
      >
        <div className="grid h-full min-h-0 grid-cols-1 gap-0 p-0 sm:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3">
          {cards.map((card, index) => (
            <StoryDropSlot
              key={`part2-slot-${index}`}
              index={index}
              card={card}
              activeId={activeId}
              onPreview={setPreviewCard}
            />
          ))}
        </div>

        <DragOverlay>
          {activeCard ? (
            <div className="aspect-[4/3] w-[min(28vw,380px)] min-w-[240px] overflow-hidden rounded-[0.8rem] border border-white/10 shadow-2xl shadow-black/50">
              <StoryCardFace
                card={activeCard}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <div className="absolute left-4 top-4 z-10">
        <button
          onClick={reshuffle}
          className="btn-purple !px-2 !py-0.5 !text-[10px] sm:!text-[10px] leading-none flex items-center gap-1"
        >
          <RotateCcw size={11} />
        </button>
      </div>

      {solved && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#120322]/90 px-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 14 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="glass-card w-full max-w-3xl border-jade/40 p-8 text-center sm:p-10"
          >
            <div className="mb-5 inline-flex h-20 w-20 items-center justify-center rounded-full border border-jade/40 bg-jade/15">
              <Sparkles size={38} className="text-jade" />
            </div>
            <h2 className="font-display mb-3 text-4xl text-gold sm:text-5xl">
              Magaling!
            </h2>
            <p className="mb-2 text-2xl font-bold text-jade sm:text-3xl">
              Naayos mo ang buong Part 2.
            </p>
            <button
              onClick={reshuffle}
              className="btn-gold mx-auto mt-6 flex items-center gap-2 !px-10 !py-3.5 text-lg"
            >
              <RotateCcw size={18} />
              Ulitin
            </button>
          </motion.div>
        </motion.div>
      )}

      {previewCard && (
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setPreviewCard(null)}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/78 px-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-6xl overflow-hidden rounded-[1.25rem] border border-white/10 bg-black shadow-2xl shadow-black/60"
          >
            <div className="relative min-h-[min(82vh,880px)] bg-black">
              <img
                src={previewCard.image}
                alt={previewCard.description}
                className="absolute inset-0 h-full w-full object-contain p-3 sm:p-4"
                draggable="false"
              />
              <div className="absolute right-4 top-4">
                <button
                  type="button"
                  onClick={() => setPreviewCard(null)}
                  className="btn-gold !px-5 !py-2.5 text-sm sm:text-base"
                >
                  Isara
                </button>
              </div>
            </div>
          </motion.div>
        </motion.button>
      )}
    </div>
  );
}

export default function PuzzleReveal() {
  const [part, setPart] = useState(1);

  if (part === 2) {
    return <PartTwoPuzzle />;
  }

  return <PartOnePuzzle onNext={() => setPart(2)} />;
}
