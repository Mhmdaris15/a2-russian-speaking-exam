import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { flashcards } from '../data/examData';
import { useProgressStore } from '../stores/useProgressStore';

type Filter = 'all' | 'unknown' | 'known';

export function FlashcardsPage() {
  const { flashcardStatus, setFlashcardStatus } = useProgressStore();
  const [filter, setFilter] = useState<Filter>('all');
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const deck = useMemo(() => {
    let cards = [...flashcards];
    if (filter === 'unknown') cards = cards.filter((c) => flashcardStatus[c.id] !== 'known');
    if (filter === 'known') cards = cards.filter((c) => flashcardStatus[c.id] === 'known');
    return cards;
  }, [filter, flashcardStatus]);

  const current = deck[idx % Math.max(deck.length, 1)];
  const knownCount = Object.values(flashcardStatus).filter((s) => s === 'known').length;

  const next = useCallback(() => {
    setFlipped(false);
    setTimeout(() => setIdx((i) => (deck.length > 0 ? (i + 1) % deck.length : 0)), 150);
  }, [deck.length]);

  const prev = useCallback(() => {
    setFlipped(false);
    setTimeout(() => setIdx((i) => (deck.length > 0 ? (i - 1 + deck.length) % deck.length : 0)), 150);
  }, [deck.length]);

  const markKnown = () => {
    if (current) setFlashcardStatus(current.id, 'known');
    next();
  };

  const markUnknown = () => {
    if (current) setFlashcardStatus(current.id, 'unknown');
    next();
  };

  const shuffle = () => {
    setIdx(0);
    setFlipped(false);
  };

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    if (e.code === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.code === 'ArrowLeft') { e.preventDefault(); prev(); }
    if (e.code === 'ArrowUp' || e.code === 'ArrowDown' || e.code === 'Space') { e.preventDefault(); setFlipped((f) => !f); }
  }, [next, prev]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold m-0" style={{ color: 'var(--color-text)' }}>Карточки</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Переворачивайте карточки RU → EN · {knownCount}/{flashcards.length} изучено
          </p>
        </div>
        <button onClick={shuffle} className="btn btn-ghost text-xs">🔀</button>
      </div>

      {/* Progress bar */}
      <div className="w-full rounded-full h-2 overflow-hidden" style={{ background: 'var(--color-surface-alt)' }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(knownCount / flashcards.length) * 100}%`, background: 'var(--color-success)' }} />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {([['all', 'Все'], ['unknown', 'Учу'], ['known', 'Знаю']] as const).map(([f, label]) => (
          <button key={f} onClick={() => { setFilter(f); setIdx(0); setFlipped(false); }} className={`btn ${filter === f ? 'btn-primary' : 'btn-secondary'} text-xs px-3 py-1.5`}>
            {label} {f === 'all' ? `(${flashcards.length})` : f === 'known' ? `(${knownCount})` : `(${flashcards.length - knownCount})`}
          </button>
        ))}
      </div>

      {/* Flashcard */}
      {deck.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-lg" style={{ color: 'var(--color-text-muted)' }}>
            {filter === 'unknown' ? '🎉 Все карточки изучены!' : 'Нет карточек'}
          </p>
        </div>
      ) : current ? (
        <div className="flex flex-col items-center gap-4">
          <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {(idx % deck.length) + 1} / {deck.length}
          </div>

          <div
            onClick={() => setFlipped((f) => !f)}
            className="cursor-pointer w-full max-w-lg"
            style={{ perspective: '1000px' }}
          >
            <motion.div
              className="relative w-full"
              style={{ minHeight: '220px', transformStyle: 'preserve-3d' }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {/* Front (Russian) */}
              <div
                className="card p-8 absolute inset-0 flex flex-col items-center justify-center"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <span className="text-xs uppercase tracking-wider mb-3 font-medium" style={{ color: 'var(--color-accent)' }}>Русский</span>
                <p className="text-ru-lg text-center font-medium" style={{ color: 'var(--color-text)' }}>{current.frontRu}</p>
                <span className="text-xs mt-4" style={{ color: 'var(--color-text-muted)' }}>Нажмите, чтобы перевернуть</span>
              </div>

              {/* Back (English) */}
              <div
                className="card p-8 absolute inset-0 flex flex-col items-center justify-center"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'var(--color-surface-alt)' }}
              >
                <span className="text-xs uppercase tracking-wider mb-3 font-medium" style={{ color: 'var(--color-success)' }}>English</span>
                <p className="text-lg text-center" style={{ color: 'var(--color-text)' }}>{current.backEn}</p>
              </div>
            </motion.div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button onClick={prev} className="btn btn-ghost text-lg px-3">←</button>
            <button onClick={markUnknown} className="btn btn-danger text-sm">✗ Ещё учу</button>
            <button onClick={markKnown} className="btn btn-success text-sm">✓ Знаю</button>
            <button onClick={next} className="btn btn-ghost text-lg px-3">→</button>
          </div>
        </div>
      ) : null}

      <div className="text-center">
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <span className="kbd">←→</span> навигация · <span className="kbd">Space</span> перевернуть · <span className="kbd">↑↓</span> перевернуть
        </p>
      </div>
    </div>
  );
}
