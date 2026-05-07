interface ProgressRingProps {
  value: number;
  max: number;
  size?: number;
  label?: string;
}

export function ProgressRing({ value, max, size = 64, label }: ProgressRingProps) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const pct = max > 0 ? (value / max) * 100 : 0;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="4" style={{ stroke: 'var(--color-border)' }} />
          <circle
            cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="4" strokeLinecap="round"
            style={{
              stroke: 'var(--color-accent)',
              strokeDasharray: circ,
              strokeDashoffset: offset,
              transition: 'stroke-dashoffset 0.5s ease',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
            {value}/{max}
          </span>
        </div>
      </div>
      {label && <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{label}</span>}
    </div>
  );
}
