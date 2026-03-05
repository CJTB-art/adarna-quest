import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Users, Grid2x2, BookMarked, Clock, ChevronRight } from 'lucide-react'
import { AdarnaBirdArt } from './CharacterArt'

const SECTIONS = [
  { screen: 1, icon: <BookOpen size={26} className="text-gold" />, title: 'Talasalitaan', sub: 'Jumbled Words', time: '5-10 min', color: 'from-purple-800/60 to-purple-950/60', border: 'border-purple-600/40' },
  { screen: 2, icon: <Users size={26} className="text-rose" />, title: 'Sino Ito?', sub: 'Character Quiz', time: '10 min', color: 'from-rose/10 to-purple-950/60', border: 'border-rose/30' },
  { screen: 3, icon: <Grid2x2 size={26} className="text-teal" />, title: 'Puzzle', sub: 'Ibong Adarna', time: '15-20 min', color: 'from-teal/10 to-purple-950/60', border: 'border-teal/30' },
  { screen: 4, icon: <BookMarked size={26} className="text-amber" />, title: 'Ayusin', sub: 'Story Order', time: '5 min', color: 'from-amber/10 to-purple-950/60', border: 'border-amber/30' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

export default function HomeScreen({ game }) {
  const [heroFailed, setHeroFailed] = useState(false)

  return (
    <div className="h-full w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-4 lg:gap-6 items-stretch overflow-hidden">
      <div className="h-full flex flex-col gap-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-5xl sm:text-6xl xl:text-7xl text-shimmer leading-tight"
        >
          Adarna Quest
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-teal-light/80 italic text-lg sm:text-xl tracking-widest"
        >
          - Interactive Classroom Game -
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="glass-card px-7 py-5"
        >
          <p className="text-white/80 text-lg leading-relaxed">
            Maligayang pagdating, mga estudyante! Subukan ang inyong kaalaman tungkol sa{' '}
            <span className="text-gold font-bold">Ibong Adarna</span>. Sumagot nang tama para ma-reveal
            ang sikat na ibon at makakuha ng pinakamataas na puntos!
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-4"
        >
          {SECTIONS.map((s) => (
            <motion.button
              key={s.title}
              variants={item}
              onClick={() => game.startAtSection(s.screen)}
              className={`bg-gradient-to-br ${s.color} border ${s.border} rounded-3xl p-6 min-h-[160px] flex flex-col gap-3 backdrop-blur-sm text-left transition-transform duration-200 hover:scale-[1.02] hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70`}
            >
              {s.icon}
              <div className="font-bold text-2xl text-white">{s.title}</div>
              <div className="text-white/70 text-base">{s.sub}</div>
              <div className="flex items-center gap-1 text-white/60 text-base mt-auto">
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
          onClick={() => game.startAtSection(1)}
          className="btn-gold w-fit flex items-center gap-3 text-2xl px-14 py-5 mt-auto self-center"
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
