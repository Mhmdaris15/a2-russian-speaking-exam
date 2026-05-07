import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { allSituations } from '../data/examData';
import { AudioRecorder } from '../components/AudioRecorder';
import { useProgressStore } from '../stores/useProgressStore';
import { useRecorderStore } from '../stores/useRecorderStore';

type Phase = 'scenario' | 'thinking' | 'speaking' | 'review';

export function SituationsPage() {
  const [pool, setPool] = useState(() => [...allSituations].sort(() => Math.random() - 0.5));
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('scenario');
  const [thinkTime, setThinkTime] = useState(30);
  const [speakTime, setSpeakTime] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const incrementSituations = useProgressStore((s) => s.incrementSituations);
  const { isRecording, startRecording, stopRecording } = useRecorderStore();

  const current = pool[idx % pool.length];

  // Thinking timer
  useEffect(() => {
    if (phase !== 'thinking' || thinkTime <= 0) return;
    const id = setInterval(() => setThinkTime((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [phase, thinkTime]);

  // Auto-transition from thinking to speaking
  useEffect(() => {
    if (phase === 'thinking' && thinkTime === 0) {
      setPhase('speaking');
      setSpeakTime(0);
      startRecording();
    }
  }, [phase, thinkTime, startRecording]);

  // Speaking timer (count up)
  useEffect(() => {
    if (phase !== 'speaking') return;
    const id = setInterval(() => setSpeakTime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  const startThinking = () => {
    setPhase('thinking');
    setThinkTime(30);
  };

  const finishSpeaking = useCallback(() => {
    if (isRecording) stopRecording();
    setPhase('review');
    setShowAnswer(false);
    incrementSituations();
  }, [isRecording, stopRecording, incrementSituations]);

  const nextSituation = () => {
    setIdx((i) => i + 1);
    setPhase('scenario');
    setThinkTime(30);
    setSpeakTime(0);
    setShowAnswer(false);
  };

  const shuffle = () => {
    setPool([...allSituations].sort(() => Math.random() - 0.5));
    setIdx(0);
    setPhase('scenario');
  };

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    if (e.code === 'Space' && phase === 'speaking') {
      e.preventDefault();
      if (isRecording) stopRecording();
      else startRecording();
    }
    if (e.code === 'Enter') {
      e.preventDefault();
      if (phase === 'scenario') startThinking();
      else if (phase === 'speaking') finishSpeaking();
      else if (phase === 'review') nextSituation();
    }
  }, [phase, isRecording, startRecording, stopRecording, finishSpeaking]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const fmtTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (!current) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold m-0" style={{ color: 'var(--color-text)' }}>Ситуации</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>Экзаменационные условия: сценарий → подготовка → ответ</p>
        </div>
        <button onClick={shuffle} className="btn btn-ghost text-xs">🔀 Перемешать</button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current.id + idx + phase} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="card p-6 sm:p-8 space-y-5">
          {/* Category badge */}
          <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: 'var(--color-warning-soft, rgba(245,158,11,0.1))', color: 'var(--color-warning)' }}>
            {current.category}
          </span>

          {/* Scenario text */}
          <p className="text-ru-lg font-medium" style={{ color: 'var(--color-text)' }}>
            {current.scenarioRu}
          </p>

          {/* Phase-specific content */}
          {phase === 'scenario' && (
            <button onClick={startThinking} className="btn btn-primary w-full">
              ⏱ Начать подготовку (30 сек)
            </button>
          )}

          {phase === 'thinking' && (
            <div className="text-center space-y-4">
              <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-warning)' }}>Время подготовки</p>
              <div className="flex justify-center">
                <div className="relative w-24 h-24">
                  <svg width="96" height="96" viewBox="0 0 96 96" className="transform -rotate-90">
                    <circle cx="48" cy="48" r="40" fill="none" strokeWidth="4" style={{ stroke: 'var(--color-border)' }} />
                    <circle cx="48" cy="48" r="40" fill="none" strokeWidth="4" strokeLinecap="round"
                      style={{
                        stroke: thinkTime <= 5 ? 'var(--color-danger)' : 'var(--color-warning)',
                        strokeDasharray: 2 * Math.PI * 40,
                        strokeDashoffset: 2 * Math.PI * 40 - (thinkTime / 30) * 2 * Math.PI * 40,
                        transition: 'stroke-dashoffset 1s linear',
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-xl font-semibold" style={{ color: thinkTime <= 5 ? 'var(--color-danger)' : 'var(--color-text)' }}>{thinkTime}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Подумайте, что вы скажете...</p>
            </div>
          )}

          {phase === 'speaking' && (
            <div className="space-y-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>Говорите!</p>
              <span className="font-mono text-lg" style={{ color: 'var(--color-accent)' }}>{fmtTime(speakTime)}</span>
              <AudioRecorder />
              <button onClick={finishSpeaking} className="btn btn-success">✓ Завершить ответ</button>
            </div>
          )}

          {phase === 'review' && (
            <div className="space-y-4">
              <AudioRecorder />
              {showAnswer ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-success)' }}>Образец ответа</p>
                  <p className="text-ru" style={{ color: 'var(--color-text)' }}>{current.answerRu}</p>
                </motion.div>
              ) : (
                <button onClick={() => setShowAnswer(true)} className="btn btn-secondary w-full">Показать образец</button>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {phase === 'review' && (
        <div className="flex justify-center">
          <button onClick={nextSituation} className="btn btn-primary">Следующая ситуация →</button>
        </div>
      )}

      <div className="text-center">
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <span className="kbd">Enter</span> далее · <span className="kbd">Space</span> запись
        </p>
      </div>
    </div>
  );
}
