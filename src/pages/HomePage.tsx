import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { useProgressStore } from '../stores/useProgressStore';
import { ProgressRing } from '../components/ProgressRing';
import { topics, flashcards } from '../data/examData';

const modes = [
  {
    to: '/presentation',
    icon: '🎤',
    title: 'Презентация',
    subtitle: 'Presentation Mode',
    desc: 'Прочитайте тему, скройте текст и тренируйтесь говорить на время.',
    color: 'var(--color-accent)',
  },
  {
    to: '/questions',
    icon: '❓',
    title: 'Вопросы',
    subtitle: 'Follow-up Questions',
    desc: 'Ответьте на дополнительные вопросы экзаменатора по каждой теме.',
    color: '#8b5cf6',
  },
  {
    to: '/situations',
    icon: '🎭',
    title: 'Ситуации',
    subtitle: 'Situation Simulator',
    desc: 'Подготовьтесь к ситуациям: подумайте, потом говорите.',
    color: '#f59e0b',
  },
  {
    to: '/flashcards',
    icon: '🃏',
    title: 'Карточки',
    subtitle: 'Flashcards',
    desc: 'Быстро запоминайте ключевые фразы с карточками RU → EN.',
    color: 'var(--color-success)',
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export function HomePage() {
  const progress = useProgressStore();
  const knownCards = Object.values(progress.flashcardStatus).filter((s) => s === 'known').length;

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="space-y-10">
      {/* Hero */}
      <motion.div variants={item} className="text-center space-y-3 pt-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
          Подготовка к экзамену A2
        </h1>
        <p className="text-base" style={{ color: 'var(--color-text-secondary)' }}>
          Говорение — практика презентаций, вопросов, ситуаций и лексики
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="card p-6 flex flex-wrap justify-center gap-8">
        <ProgressRing value={progress.practicedTopics.length} max={topics.length} label="Темы" />
        <ProgressRing value={progress.questionsAnswered} max={15} label="Вопросы" />
        <ProgressRing value={progress.situationsPracticed} max={30} label="Ситуации" />
        <ProgressRing value={knownCards} max={flashcards.length} label="Карточки" />
      </motion.div>

      {/* Mode cards */}
      <motion.div variants={container} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {modes.map((mode) => (
          <motion.div key={mode.to} variants={item}>
            <Link to={mode.to} className="block no-underline">
              <div
                className="card p-6 h-full cursor-pointer transition-transform hover:-translate-y-1"
                style={{ borderLeft: `3px solid ${mode.color}` }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{mode.icon}</span>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold m-0" style={{ color: 'var(--color-text)' }}>
                      {mode.title}
                    </h2>
                    <p className="text-xs mt-0.5 mb-2" style={{ color: 'var(--color-text-muted)' }}>
                      {mode.subtitle}
                    </p>
                    <p className="text-sm m-0" style={{ color: 'var(--color-text-secondary)' }}>
                      {mode.desc}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Keyboard shortcuts hint */}
      <motion.div variants={item} className="text-center space-y-2">
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Горячие клавиши: <span className="kbd">Space</span> запись · <span className="kbd">Enter</span> далее · <span className="kbd">←→</span> карточки · <span className="kbd">D</span> тёмная тема · <span className="kbd">Esc</span> назад
        </p>
      </motion.div>
    </motion.div>
  );
}
