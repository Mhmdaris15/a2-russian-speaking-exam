import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { topics } from '../data/examData';
import { AudioRecorder } from '../components/AudioRecorder';
import { useProgressStore } from '../stores/useProgressStore';
import { useRecorderStore } from '../stores/useRecorderStore';

type Phase = 'select' | 'read' | 'practice';

export function PresentationPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>('select');
  const [showEnglish, setShowEnglish] = useState(false);
  const [showText, setShowText] = useState(false);
  const [timer, setTimer] = useState(180); // 3 minutes
  const [timerRunning, setTimerRunning] = useState(false);
  const markTopicPracticed = useProgressStore((s) => s.markTopicPracticed);
  const incrementSessions = useProgressStore((s) => s.incrementSessions);
  const practicedTopics = useProgressStore((s) => s.practicedTopics);
  const { isRecording, startRecording, stopRecording } = useRecorderStore();

  const topic = topics.find((t) => t.id === selectedId);

  // Timer countdown
  useEffect(() => {
    if (!timerRunning || timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timerRunning, timer]);

  // When timer hits 0
  useEffect(() => {
    if (timer === 0 && timerRunning) {
      setTimerRunning(false);
      if (isRecording) stopRecording();
    }
  }, [timer, timerRunning, isRecording, stopRecording]);

  const handleSelect = (id: number) => {
    setSelectedId(id);
    setPhase('read');
    setShowEnglish(false);
    setShowText(false);
    setTimer(180);
    setTimerRunning(false);
  };

  const startPractice = () => {
    setPhase('practice');
    setTimerRunning(true);
  };

  const finishPractice = () => {
    if (selectedId) {
      markTopicPracticed(selectedId);
      incrementSessions();
    }
    setPhase('select');
    setSelectedId(null);
  };

  // Keyboard shortcuts
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    if (e.code === 'Space' && phase === 'practice') {
      e.preventDefault();
      if (isRecording) stopRecording();
      else startRecording();
    }
    if (e.code === 'Escape') {
      setPhase('select');
      setSelectedId(null);
    }
  }, [phase, isRecording, startRecording, stopRecording]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const fmtTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold m-0" style={{ color: 'var(--color-text)' }}>Презентация</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>Выберите тему, прочитайте текст, затем говорите на время</p>
      </div>

      <AnimatePresence mode="wait">
        {/* ── Topic Selection ── */}
        {phase === 'select' && (
          <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-3">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelect(t.id)}
                className="card p-5 text-left cursor-pointer w-full border-none transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--color-surface)' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold" style={{ color: 'var(--color-accent)' }}>{t.id}</span>
                    <div>
                      <div className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>{t.titleRu}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{t.titleEn}</div>
                    </div>
                  </div>
                  {practicedTopics.includes(t.id) && (
                    <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: 'var(--color-success-soft)', color: 'var(--color-success)' }}>
                      ✓ Отработано
                    </span>
                  )}
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {/* ── Reading Phase ── */}
        {phase === 'read' && topic && (
          <motion.div key="read" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div className="card p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold m-0" style={{ color: 'var(--color-text)' }}>{topic.titleRu}</h2>
                <button onClick={() => setShowEnglish(!showEnglish)} className="btn btn-ghost text-xs">
                  {showEnglish ? 'Скрыть EN' : 'Показать EN'}
                </button>
              </div>
              <p className="text-ru leading-relaxed" style={{ color: 'var(--color-text)' }}>{topic.textRu}</p>
              {showEnglish && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-sm leading-relaxed pt-4" style={{ color: 'var(--color-text-secondary)', borderTop: '1px solid var(--color-border)' }}>
                  {topic.textEn}
                </motion.p>
              )}
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={() => { setPhase('select'); setSelectedId(null); }} className="btn btn-secondary">← Назад</button>
              <button onClick={startPractice} className="btn btn-primary">🎤 Начать практику</button>
            </div>
          </motion.div>
        )}

        {/* ── Practice Phase ── */}
        {phase === 'practice' && topic && (
          <motion.div key="practice" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="card p-6 sm:p-8 text-center space-y-6">
              <h2 className="text-lg font-semibold m-0" style={{ color: 'var(--color-text)' }}>{topic.titleRu}</h2>

              {/* Timer */}
              <div className="flex justify-center">
                <div className="relative w-28 h-28">
                  <svg width="112" height="112" viewBox="0 0 112 112" className="transform -rotate-90">
                    <circle cx="56" cy="56" r="48" fill="none" strokeWidth="4" style={{ stroke: 'var(--color-border)' }} />
                    <circle cx="56" cy="56" r="48" fill="none" strokeWidth="4" strokeLinecap="round"
                      style={{
                        stroke: timer <= 30 ? 'var(--color-danger)' : 'var(--color-accent)',
                        strokeDasharray: 2 * Math.PI * 48,
                        strokeDashoffset: 2 * Math.PI * 48 - (timer / 180) * 2 * Math.PI * 48,
                        transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease',
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-xl font-semibold" style={{ color: timer <= 30 ? 'var(--color-danger)' : 'var(--color-text)' }}>{fmtTime(timer)}</span>
                  </div>
                </div>
              </div>

              {/* Hidden text with reveal */}
              {showText ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="text-ru leading-relaxed text-left" style={{ color: 'var(--color-text-secondary)' }}>{topic.textRu}</p>
                  <button onClick={() => setShowText(false)} className="btn btn-ghost text-xs mt-2">Скрыть текст</button>
                </motion.div>
              ) : (
                <button onClick={() => setShowText(true)} className="btn btn-ghost text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  👁 Подсмотреть текст
                </button>
              )}

              <AudioRecorder />
            </div>

            <div className="flex gap-3 justify-center">
              <button onClick={() => { setPhase('read'); setTimerRunning(false); }} className="btn btn-secondary">← К тексту</button>
              <button onClick={finishPractice} className="btn btn-success">✓ Завершить</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
