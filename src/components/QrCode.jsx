import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export function QrCode({ value, size = 150 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !value) return;
    QRCode.toCanvas(
      canvas,
      value,
      {
        width: size,
        margin: 2,
        color: {
          dark: "#f0f0f0",
          light: "#0d0d0d",
        },
      },
      () => {},
    );
  }, [value, size]);

  if (!value) return null;

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        border: "1px solid var(--b)",
        background: "#0d0d0d",
      }}
    />
  );
}

