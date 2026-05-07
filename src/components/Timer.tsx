import { useState, useEffect, useCallback } from 'react';

interface TimerProps {
  seconds: number;
  onComplete?: () => void;
  autoStart?: boolean;
  countUp?: boolean;
  label?: string;
}

export function Timer({ seconds, onComplete, autoStart = false, countUp = false, label }: TimerProps) {
  const [time, setTime] = useState(countUp ? 0 : seconds);
  const [running, setRunning] = useState(autoStart);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTime((t) => {
        const next = countUp ? t + 1 : t - 1;
        if (!countUp && next <= 0) {
          clearInterval(id);
          setRunning(false);
          onComplete?.();
          return 0;
        }
        if (countUp && next >= seconds) {
          clearInterval(id);
          setRunning(false);
          onComplete?.();
          return seconds;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, countUp, seconds, onComplete]);

  const start = useCallback(() => setRunning(true), []);
  const reset = useCallback(() => {
    setRunning(false);
    setTime(countUp ? 0 : seconds);
  }, [countUp, seconds]);

  const pct = countUp ? (time / seconds) * 100 : (time / seconds) * 100;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {label && <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>{label}</span>}
      <div className="relative w-24 h-24">
        <svg width="96" height="96" viewBox="0 0 96 96" className="transform -rotate-90">
          <circle cx="48" cy="48" r={r} fill="none" strokeWidth="4" style={{ stroke: 'var(--color-border)' }} />
          <circle
            cx="48" cy="48" r={r} fill="none" strokeWidth="4" strokeLinecap="round"
            style={{
              stroke: time <= 10 && !countUp ? 'var(--color-danger)' : 'var(--color-accent)',
              strokeDasharray: circ,
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 0.3s ease, stroke 0.3s ease',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
            {formatTime(time)}
          </span>
        </div>
      </div>
      {!running && time === (countUp ? 0 : seconds) && (
        <button onClick={start} className="btn btn-primary text-sm px-4 py-2">Старт</button>
      )}
      {running && (
        <button onClick={reset} className="btn btn-ghost text-xs px-3 py-1">Сброс</button>
      )}
      {!running && time !== (countUp ? 0 : seconds) && time > 0 && (
        <button onClick={reset} className="btn btn-ghost text-xs px-3 py-1">Заново</button>
      )}
    </div>
  );
}
