import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Users, Grid2x2, BookMarked, Clock, ChevronRight } from 'lucide-react'
import { AdarnaBirdArt } from './CharacterArt'
import { useSound } from '../hooks/useSound'

const SECTIONS = [
  {
    screen: 1,
    icon: <BookOpen size={26} className="text-gold" />,
    title: 'Talasalitaan',
    sub: 'Jumbled Words',
    time: '5-10 min',
    color: 'from-purple-800/60 to-purple-950/60',
    border: 'border-purple-600/40',
  },
  {
    screen: 2,
    icon: <Users size={26} className="text-rose" />,
    title: 'Sino Ito?',
    sub: 'Character Quiz',
    time: '10 min',
    color: 'from-rose/10 to-purple-950/60',
    border: 'border-rose/30',
  },
  {
    screen: 3,
    icon: <Grid2x2 size={26} className="text-teal" />,
    title: 'Puzzle',
    sub: 'Ibong Adarna',
    time: '15-20 min',
    color: 'from-teal/10 to-purple-950/60',
    border: 'border-teal/30',
  },
  {
    screen: 4,
    icon: <BookMarked size={26} className="text-amber" />,
    title: 'Ayusin',
    sub: 'Story Order',
    time: '5 min',
    color: 'from-amber/10 to-purple-950/60',
    border: 'border-amber/30',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

function SectionVisual({ screen }) {
  if (screen === 1) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute right-3 top-4 text-5xl font-black text-white/10 blur-[1px] rotate-12">A</div>
        <div className="absolute right-12 top-10 text-4xl font-black text-gold/20 blur-[1px] -rotate-6">NG</div>
        <div className="absolute right-8 bottom-5 text-6xl font-black text-white/10 blur-[1px]">AR</div>
        <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-gold/15 blur-2xl" />
      </div>
    )
  }

  if (screen === 2) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/characters/don-juan.png"
          alt=""
          aria-hidden="true"
          className="absolute -right-6 -bottom-6 h-[150%] w-[65%] object-cover opacity-20 blur-sm"
        />
        <div className="absolute right-0 top-0 h-full w-2/3 bg-gradient-to-l from-rose/20 to-transparent" />
      </div>
    )
  }

  if (screen === 3) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/adarna/ibong-adarna-hero.png"
          alt=""
          aria-hidden="true"
          className="absolute -right-8 -bottom-8 h-[160%] w-[75%] object-cover opacity-20 blur-sm"
        />
        <div className="absolute right-3 top-3 grid grid-cols-2 gap-1.5 opacity-45">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-4 w-4 rounded-sm border border-teal/40 bg-teal/20" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute right-4 top-8 w-28 space-y-2 opacity-45">
        <div className="h-4 rounded-full bg-amber/30 blur-[1px]" />
        <div className="h-4 rounded-full bg-white/15 blur-[1px]" />
        <div className="h-4 rounded-full bg-amber/20 blur-[1px]" />
      </div>
      <div className="absolute right-6 bottom-4 h-20 w-24 rounded-2xl border border-amber/25 bg-amber/10 backdrop-blur-sm rotate-6" />
    </div>
  )
}

export default function HomeScreen({ game }) {
  const [heroFailed, setHeroFailed] = useState(false)
  const sound = useSound()

  return (
    <div className="h-full w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-3 lg:gap-5 items-stretch overflow-hidden">
      <div className="h-full min-h-0 flex flex-col gap-3">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-[clamp(2.1rem,4.3vw,4.4rem)] text-shimmer leading-tight"
        >
          Adarna Quest
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-teal-light/80 italic text-base sm:text-lg tracking-[0.18em]"
        >
          - Interactive Classroom Game -
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="glass-card px-5 py-4 sm:px-6 sm:py-4"
        >
          <p className="text-white/80 text-base sm:text-lg leading-relaxed">
            Maligayang pagdating, mga estudyante! Subukan ang inyong kaalaman tungkol sa{' '}
            <span className="text-gold font-bold">Ibong Adarna</span>. Sumagot nang tama para ma-reveal
            ang sikat na ibon at makakuha ng pinakamataas na puntos!
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-3"
        >
          {SECTIONS.map((s) => (
            <motion.button
              key={s.title}
              variants={item}
              onClick={() => {
                sound.playClick()
                game.startAtSection(s.screen)
              }}
              className={`relative overflow-hidden bg-gradient-to-br ${s.color} border ${s.border} rounded-3xl p-4 sm:p-5 min-h-[clamp(124px,18vh,170px)] flex flex-col gap-2 backdrop-blur-sm text-left transition-transform duration-200 hover:scale-[1.02] hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70`}
            >
              <SectionVisual screen={s.screen} />
              {s.icon}
              <div className="font-bold text-xl sm:text-2xl text-white relative z-10">{s.title}</div>
              <div className="text-white/70 text-sm sm:text-base relative z-10">{s.sub}</div>
              <div className="flex items-center gap-1 text-white/60 text-sm sm:text-base mt-auto relative z-10">
                <Clock size={11} />
                {s.time}
              </div>
            </motion.button>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.85, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            sound.playClick()
            game.startAtSection(1)
          }}
          className="btn-gold w-fit flex items-center gap-2.5 text-xl sm:text-2xl px-10 sm:px-12 py-3.5 sm:py-4 mt-auto self-center"
        >
          Simulan ang Laro
          <ChevronRight size={22} />
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25 }}
        className="hidden lg:block h-full"
      >
        <div className="h-full glass-card overflow-hidden border-gold/30">
          {!heroFailed ? (
            <img
              src="/images/adarna/ibong-adarna-hero.png"
              alt="Ibong Adarna"
              onError={() => setHeroFailed(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <AdarnaBirdArt size={420} />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
