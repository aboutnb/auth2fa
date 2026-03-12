export function Ring({ progress, remaining, size = 40 }) {
  const r = size / 2 - 4;
  const circ = 2 * Math.PI * r;
  const urgent = remaining <= 7;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ position: "absolute" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          opacity={0.1}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={urgent ? "#f87171" : "var(--o)"}
          strokeWidth="2.5"
          strokeDasharray={circ}
          strokeDashoffset={circ * progress}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset .5s linear" }}
        />
      </svg>
      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 9,
          fontFamily: "var(--mono)",
          fontWeight: 700,
          color: urgent ? "#f87171" : "var(--muted)",
        }}
      >
        {remaining}
      </span>
    </div>
  );
}

