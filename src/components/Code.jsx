export function Code({ code, flash, urgent, large }) {
  const digits = (code || "------").split("");
  return (
    <div
      className={[
        "code",
        large && "code-lg",
        urgent && "code-urgent",
        flash && "code-flash",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {digits.map((d, i) => (
        <span key={i} className="code-d" style={{ animationDelay: `${i * 0.03}s` }}>
          {i === 3 && <span className="code-sep" />}
          {d}
        </span>
      ))}
    </div>
  );
}

