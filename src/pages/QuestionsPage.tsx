import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { allFollowUpQuestions, followUpSets } from '../data/examData';
import { AudioRecorder } from '../components/AudioRecorder';
import { useProgressStore } from '../stores/useProgressStore';
import { useRecorderStore } from '../stores/useRecorderStore';

export function QuestionsPage() {
  const [filterTopic, setFilterTopic] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const incrementQuestions = useProgressStore((s) => s.incrementQuestions);
  const { isRecording, startRecording, stopRecording } = useRecorderStore();

  const filtered = useMemo(() => {
    const qs = filterTopic ? allFollowUpQuestions.filter((q) => q.topicId === filterTopic) : allFollowUpQuestions;
    return [...qs].sort(() => Math.random() - 0.5);
  }, [filterTopic]);

  const current = filtered[currentIdx % filtered.length];

  const nextQuestion = useCallback(() => {
    setShowAnswer(false);
    setCurrentIdx((i) => i + 1);
    incrementQuestions();
  }, [incrementQuestions]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    if (e.code === 'Enter') {
      e.preventDefault();
      if (showAnswer) nextQuestion();
      else setShowAnswer(true);
    }
    if (e.code === 'Space') {
      e.preventDefault();
      if (isRecording) stopRecording();
      else startRecording();
    }
  }, [showAnswer, nextQuestion, isRecording, startRecording, stopRecording]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  if (!current) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold m-0" style={{ color: 'var(--color-text)' }}>Дополнительные вопросы</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>Ответьте на вопрос, затем проверьте ответ</p>
      </div>

      {/* Topic filter */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => { setFilterTopic(null); setCurrentIdx(0); setShowAnswer(false); }} className={`btn ${filterTopic === null ? 'btn-primary' : 'btn-secondary'} text-xs px-3 py-1.5`}>
          Все темы
        </button>
        {followUpSets.map((s) => (
          <button key={s.topicId} onClick={() => { setFilterTopic(s.topicId); setCurrentIdx(0); setShowAnswer(false); }} className={`btn ${filterTopic === s.topicId ? 'btn-primary' : 'btn-secondary'} text-xs px-3 py-1.5`}>
            {s.topicTitleRu}
          </button>
        ))}
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div key={current.id + currentIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="card p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}>
              {current.topicTitleRu}
            </span>
          </div>

          <p className="text-ru-lg font-medium" style={{ color: 'var(--color-text)' }}>
            {current.questionRu}
          </p>

          <AudioRecorder />

          {showAnswer ? (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
              <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-success)' }}>Образец ответа</p>
              <p className="text-ru" style={{ color: 'var(--color-text)' }}>{current.answerRu}</p>
            </motion.div>
          ) : (
            <button onClick={() => setShowAnswer(true)} className="btn btn-secondary w-full">
              Показать ответ
            </button>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-3">
        <button onClick={nextQuestion} className="btn btn-primary">
          Следующий вопрос →
        </button>
      </div>

      <div className="text-center">
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <span className="kbd">Enter</span> показать/далее · <span className="kbd">Space</span> запись
        </p>
      </div>
    </div>
  );
}
