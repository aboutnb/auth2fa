import { useEffect, useRef, useState } from "react";
import { totp } from "../utils/totp.js";
import { IPlus } from "./Icons.jsx";
import { getPlatformById } from "../constants/platforms.jsx";
import { PlatformPicker } from "./PlatformPicker.jsx";

const COLORS = [
  "#f97316",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#ec4899",
  "#f59e0b",
  "#3b82f6",
  "#ef4444",
  "#fc6d26",
  "#5865f2",
];

export function AddModal({ prefill = {}, onAdd, onClose }) {
  const [platformId, setPlatformId] = useState(prefill.platformId || "github");
  const [label, setLabel] = useState("");
  const [secret, setSecret] = useState(prefill.secret || "");
  const [err, setErr] = useState("");
  const ref = useRef();
  const platform = getPlatformById(platformId);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const submit = async () => {
    if (!label.trim()) return setErr("请输入账户名称");
    if (!secret.trim()) return setErr("请输入密钥");
    const test = await totp(secret.trim());
    if (!test) return setErr("密钥格式无效");
    onAdd({
      id: Date.now(),
      label: label.trim(),
      secret: secret.trim(),
      platformId,
      color: platform.color || COLORS[Math.floor(Math.random() * COLORS.length)],
    });
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-hd">
          <div
            className="modal-icon"
            style={{
              background: `${platform.color}18`,
              border: `1px solid ${platform.color}30`,
              color: platform.color,
            }}
          >
            <platform.icon />
          </div>
          <div>
            <div className="modal-title">添加账户</div>
            <div className="modal-sub">保存 TOTP 账户以便长期管理</div>
          </div>
        </div>
        <div className="field">
          <label className="field-label">平台</label>
          <PlatformPicker value={platformId} onChange={setPlatformId} />
        </div>
        <div className="field">
          <label className="field-label">账户名称</label>
          <div className="field-wrap">
            <input
              ref={ref}
              className="field-input"
              placeholder="例如：my@email.com 或 用户名"
              value={label}
              onChange={(e) => {
                setLabel(e.target.value);
                setErr("");
              }}
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
          </div>
        </div>
        <div className="field">
          <label className="field-label">Base32 密钥</label>
          <div className="field-wrap">
            <input
              className="field-input mono"
              placeholder="JBSWY3DPEHPK3PXP"
              value={secret}
              onChange={(e) => {
                setSecret(
                  e.target.value
                    .toUpperCase()
                    .replace(/[^A-Z2-7= ]/g, ""),
                );
                setErr("");
              }}
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
          </div>
          <div className="field-hint">{platform.hint}</div>
        </div>
        {err && <div className="field-err">{err}</div>}
        <div className="modal-actions">
          <button className="btn-sec" onClick={onClose}>
            取消
          </button>
          <button className="btn-pri" onClick={submit}>
            <IPlus /> 添加账户
          </button>
        </div>
      </div>
    </div>
  );
}

