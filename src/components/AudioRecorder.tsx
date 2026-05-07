import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRecorderStore } from '../stores/useRecorderStore';

export function AudioRecorder() {
  const { isRecording, audioUrl, duration, startRecording, stopRecording, clearRecording } = useRecorderStore();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [displayTime, setDisplayTime] = React.useState(0);

  useEffect(() => {
    if (isRecording) {
      const start = Date.now();
      timerRef.current = setInterval(() => {
        setDisplayTime(Math.round((Date.now() - start) / 1000));
      }, 200);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setDisplayTime(0);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRecording]);

  const toggleRecording = () => {
    if (isRecording) stopRecording();
    else startRecording();
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-4">
        <motion.button
          onClick={toggleRecording}
          className="relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer border-none"
          style={{
            background: isRecording ? 'var(--color-danger)' : 'var(--color-accent)',
            color: 'white',
          }}
          whileTap={{ scale: 0.9 }}
          animate={isRecording ? { scale: [1, 1.05, 1] } : {}}
          transition={isRecording ? { repeat: Infinity, duration: 1.2 } : {}}
          title="Space to toggle recording"
        >
          {isRecording ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><rect x="3" y="3" width="14" height="14" rx="2" /></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
          )}
        </motion.button>

        {isRecording && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-danger)' }} />
            <span className="font-mono text-sm" style={{ color: 'var(--color-danger)' }}>{formatTime(displayTime)}</span>
          </motion.div>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
        <span className="kbd">Space</span>
        <span>{isRecording ? 'Стоп' : 'Запись'}</span>
      </div>

      {audioUrl && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-3 flex items-center gap-3 w-full max-w-sm">
          <audio src={audioUrl} controls className="flex-1 h-8" style={{ minWidth: 0 }} />
          <span className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>{formatTime(duration)}</span>
          <button onClick={clearRecording} className="btn btn-ghost text-xs px-2 py-1">✕</button>
        </motion.div>
      )}
    </div>
  );
}
