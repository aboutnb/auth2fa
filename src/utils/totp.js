import { useState, useEffect, useCallback, useRef } from "react";

export const PERIOD = 30;

function base32Decode(encoded) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = 0;
  let value = 0;
  const out = [];
  for (const ch of encoded.toUpperCase().replace(/[^A-Z2-7]/g, "")) {
    value = (value << 5) | chars.indexOf(ch);
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return new Uint8Array(out);
}

export async function totp(secret) {
  try {
    const key = base32Decode(secret);
    if (!key.length) return null;
    const counter = Math.floor(Date.now() / 1000 / PERIOD);
    const cb = new Uint8Array(8);
    let c = counter;
    for (let i = 7; i >= 0; i--) {
      cb[i] = c & 0xff;
      c = Math.floor(c / 256);
    }
    const k = await crypto.subtle.importKey(
      "raw",
      key,
      { name: "HMAC", hash: "SHA-1" },
      false,
      ["sign"],
    );
    const sig = new Uint8Array(await crypto.subtle.sign("HMAC", k, cb));
    const off = sig[sig.length - 1] & 0x0f;
    const n =
      ((sig[off] & 0x7f) << 24) |
      ((sig[off + 1] & 0xff) << 16) |
      ((sig[off + 2] & 0xff) << 8) |
      sig[off + 3];
    return String(n % 1000000).padStart(6, "0");
  } catch {
    return null;
  }
}

export function useTOTP(secret) {
  const [code, setCode] = useState(null);
  const [progress, setProgress] = useState(0);
  const [flash, setFlash] = useState(false);
  const prev = useRef(-1);

  const refresh = useCallback(async (s) => {
    const c = await totp(s);
    if (c) {
      setCode(c);
      setFlash(true);
      setTimeout(() => setFlash(false), 400);
    }
  }, []);

  useEffect(() => {
    if (!secret) {
      setCode(null);
      setProgress(0);
      return;
    }
    // 同一 30s 窗口内换密钥时 counter 不变，若不复位 prev 则不会 refresh
    prev.current = -1;
    const tick = () => {
      const now = Date.now() / 1000;
      const elapsed = now % PERIOD;
      const counter = Math.floor(now / PERIOD);
      setProgress(elapsed / PERIOD);
      if (counter !== prev.current) {
        prev.current = counter;
        refresh(secret);
      }
    };
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [secret, refresh]);

  const remaining = Math.max(1, Math.ceil(PERIOD - progress * PERIOD));
  return { code, progress, remaining, flash };
}

