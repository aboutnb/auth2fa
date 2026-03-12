import { useEffect, useRef, useState } from "react";
import { PERIOD, totp, useTOTP } from "../utils/totp.js";
import { ICheck, IShield } from "./Icons.jsx";
import { Ring } from "./Ring.jsx";
import { Code } from "./Code.jsx";
import { CopyBtn } from "./CopyBtn.jsx";

export function QuickGen({ onSave }) {
  const [raw, setRaw] = useState("");
  const [secret, setSecret] = useState("");
  const [err, setErr] = useState("");
  const [validating, setValidating] = useState(false);
  const { code, progress, remaining, flash } = useTOTP(secret);
  const ref = useRef();
  const urgent = remaining <= 7;

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    if (!raw.trim()) {
      setSecret("");
      setErr("");
      return;
    }
    setErr("");
    const id = setTimeout(async () => {
      setValidating(true);
      const result = await totp(raw.trim());
      setValidating(false);
      if (result) setSecret(raw.trim());
      else {
        setSecret("");
        setErr("密钥格式无效，请检查（仅含字母 A–Z 和数字 2–7）");
      }
    }, 600);
    return () => clearTimeout(id);
  }, [raw]);

  return (
    <div className="qg">
      <div className="qg-hero">
        <div className="qg-hero-icon">
          <IShield />
        </div>
        <div>
          <div className="qg-hero-title">快速生成验证码</div>
          <div className="qg-hero-sub">
            输入密钥，600ms 内自动生成实时 TOTP 验证码
          </div>
        </div>
      </div>

      <div className="field">
        <label className="field-label">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="12"
            height="12"
          >
            <path d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
          </svg>
          Base32 密钥
        </label>
        <div className="field-wrap">
          <input
            ref={ref}
            className={`field-input mono ${
              err ? "fi-err" : secret ? "fi-ok" : ""
            }`}
            placeholder="例如：JBSWY3DPEHPK3PXP"
            value={raw}
            onChange={(e) =>
              setRaw(
                e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z2-7= ]/g, ""),
              )
            }
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
          />
          {validating && <div className="field-spin" />}
          {!validating && secret && (
            <div className="field-ok">
              <ICheck />
            </div>
          )}
        </div>
        {err ? (
          <div className="field-err">{err}</div>
        ) : (
          <div className="field-hint">
            在 GitHub → Settings → Password and authentication → 2FA
            设置中找到密钥
          </div>
        )}
      </div>

      {secret ? (
        <div className={`result-card ${urgent ? "result-urgent" : ""}`}>
          <div className="result-top">
            <div className="result-label">
              <div className="live-dot" />
              实时验证码
            </div>
            <Ring progress={progress} remaining={remaining} size={38} />
          </div>
          <div className="result-body">
            <Code code={code} flash={flash} urgent={urgent} large />
            <div className="result-btns">
              <CopyBtn
                text={code}
                label="复制验证码"
                className="btn-copy-lg"
              />
              <button
                className="btn-save"
                onClick={() => onSave(secret)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="14"
                  height="14"
                >
                  <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
                保存账户
              </button>
            </div>
          </div>
          <div className="result-foot">
            <span>每 {PERIOD} 秒自动刷新</span>
            <span className={urgent ? "txt-urgent" : ""}>
              {urgent ? "⚠ 即将刷新" : `${remaining} 秒后刷新`}
            </span>
          </div>
        </div>
      ) : (
        <div className="result-empty">
          <div className="empty-digits">
            {"------".split("").map((_, i) => (
              <span
                key={i}
                className={`ed ${i === 3 ? "ed-gap" : ""}`}
              >
                –
              </span>
            ))}
          </div>
          <div className="empty-hint">输入密钥后自动生成验证码</div>
        </div>
      )}

      <div className="howto">
        <div className="howto-title">如何获取密钥？</div>
        {[
          ["1", "前往 GitHub → Settings"],
          ["2", "点击 Password and authentication"],
          ["3", "在 Two-factor methods 选择 Authenticator app"],
          ["4", "点击「Setup key」查看 Base32 密钥并复制"],
        ].map(([n, t]) => (
          <div key={n} className="howto-row">
            <span className="howto-n">{n}</span>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

