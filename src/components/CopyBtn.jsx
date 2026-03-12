import { useState } from "react";
import { ICopy, ICheck } from "./Icons.jsx";

export function CopyBtn({ text, label = "复制", className = "" }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      className={`btn-copy ${copied ? "copied" : ""} ${className}`}
      onClick={copy}
    >
      {copied ? (
        <>
          <ICheck />
          <span>已复制</span>
        </>
      ) : (
        <>
          <ICopy />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

