import { useState } from "react";
import { useTOTP } from "../utils/totp.js";
import { ITrash } from "./Icons.jsx";
import { getPlatformById } from "../constants/platforms.jsx";
import { Code } from "./Code.jsx";
import { CopyBtn } from "./CopyBtn.jsx";
import { Ring } from "./Ring.jsx";
import { QrCode } from "./QrCode.jsx";

export function AccountCard({ acct, onDelete }) {
  const { code, progress, remaining, flash } = useTOTP(acct.secret);
  const urgent = remaining <= 7;
  const platform = getPlatformById(acct.platformId);
  const [showQr, setShowQr] = useState(false);

  return (
    <div className={`acard ${urgent ? "acard-urgent" : ""}`}>
      <div className="acard-top">
        <div className="acard-id">
          <div
            className="acard-av"
            style={{ background: acct.color || platform.color || "#e8612c" }}
          >
            {acct.label?.[0]?.toUpperCase() || platform.name?.[0] || "T"}
          </div>
          <div>
            <div className="acard-name">{acct.label || platform.name}</div>
            <div className="acard-sub">
              <platform.icon />
              {platform.name} · TOTP
            </div>
          </div>
        </div>
        <button
          className="acard-del"
          onClick={() => onDelete(acct.id)}
          title="删除"
        >
          <ITrash />
        </button>
      </div>
      <div className="acard-bot">
        <Code code={code} flash={flash} urgent={urgent} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <CopyBtn text={code} />
            <button
              className="btn-sec"
              style={{
                paddingInline: 10,
                flex: "0 0 auto",
                fontSize: 12,
              }}
              onClick={() => setShowQr((v) => !v)}
            >
              {showQr ? "收起二维码" : "显示二维码"}
            </button>
            <Ring progress={progress} remaining={remaining} size={34} />
          </div>
          {showQr && (
            <div
              style={{
                marginTop: 4,
                padding: 10,
                borderRadius: 10,
                border: "1px solid var(--b)",
                background: "var(--bg3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  lineHeight: 1.5,
                  maxWidth: 210,
                }}
              >
                扫描二维码可将此 TOTP 账户导入到其他验证器应用（如 Google
                Authenticator）。
              </div>
              <QrCode
                size={96}
                value={`otpauth://totp/${encodeURIComponent(
                  acct.label || platform.name,
                )}?secret=${encodeURIComponent(
                  acct.secret,
                )}&issuer=${encodeURIComponent(platform.name)}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

