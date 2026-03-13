import { useEffect, useRef, useState } from "react";
import { PLATFORMS, getPlatformById } from "../constants/platforms.jsx";
import { ICheck } from "./Icons.jsx";

export function PlatformPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = getPlatformById(value);
  const ref = useRef();

  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const SelectedIcon = selected.icon;

  return (
    <div ref={ref} className="pp">
      <button className="pp-btn" onClick={() => setOpen((o) => !o)}>
        <span className="pp-ico">
          <SelectedIcon />
        </span>
        <span>{selected.name}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="12"
          height="12"
          style={{
            marginLeft: "auto",
            opacity: 0.5,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform .15s",
          }}
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="pp-drop">
          {PLATFORMS.map((p) => {
            const PIcon = p.icon;
            const isOn = p.id === value;
            return (
              <button
                key={p.id}
                className={`pp-opt ${isOn ? "pp-opt-on" : ""}`}
                onClick={() => {
                  onChange(p.id);
                  setOpen(false);
                }}
              >
                <span className="pp-ico">
                  <PIcon />
                </span>
                <span>{p.name}</span>
                {isOn && (
                  <span style={{ marginLeft: "auto", color: "var(--o)" }}>
                    <ICheck />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

