import { useEffect, useRef, useState } from "react";
import { totp } from "../utils/totp.js";
import { IGithub, IPlus } from "./Icons.jsx";

const COLORS = [
  "#f97316",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#ec4899",
  "#f59e0b",
  "#3b82f6",
  "#ef4444",
];

export function AddModal({ prefill = "", onAdd, onClose }) {
  const [username, setUsername] = useState("");
  const [secret, setSecret] = useState(prefill);
  const [err, setErr] = useState("");
  const ref = useRef();

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const submit = async () => {
    if (!username.trim()) return setErr("请输入 GitHub 用户名");
    if (!secret.trim()) return setErr("请输入 2FA 密钥");
    const test = await totp(secret.trim());
    if (!test) return setErr("密钥格式无效，请重新检查");
    onAdd({
      id: Date.now(),
      username: username.trim(),
      secret: secret.trim(),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-hd">
          <div className="modal-icon">
            <IGithub size={18} />
          </div>
          <div>
            <div className="modal-title">添加 GitHub 账户</div>
            <div className="modal-sub">
              保存账户后可在「账户管理」中查看
            </div>
          </div>
        </div>
        <div className="field">
          <label className="field-label">GitHub 用户名</label>
          <div className="field-wrap">
            <input
              ref={ref}
              className="field-input"
              placeholder="octocat"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
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

