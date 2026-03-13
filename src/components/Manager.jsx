import { useState } from "react";
import { IPlus, IGithub } from "./Icons.jsx";
import { AccountCard } from "./AccountCard.jsx";
import { AddModal } from "./AddModal.jsx";

export function Manager({ accounts, onAdd, onDelete }) {
  const [modal, setModal] = useState(false);

  const handleExport = () => {
    if (!accounts || accounts.length === 0) {
      window.alert("暂无可导出的账户");
      return;
    }
    const payload = accounts.map(
      ({ id, label, secret, platformId, color }) => ({
        id,
        label,
        secret,
        platformId,
        color,
      }),
    );
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `2fa-accounts-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mgr-hd">
        <div>
          <div className="mgr-title">账户管理</div>
          <div className="mgr-sub">
            已保存 {accounts.length} 个账户，实时显示验证码
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            className="btn-sec"
            style={{ paddingInline: 10, whiteSpace: "nowrap" }}
            onClick={handleExport}
          >
            导出 JSON
          </button>
          <button
            className="btn-add-acct"
            onClick={() => setModal(true)}
          >
            <IPlus /> 添加
          </button>
        </div>
      </div>

      {accounts.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">
            <IGithub size={22} />
          </div>
          <div className="empty-title">暂无保存的账户</div>
          <div className="empty-sub">
            在「快速生成」输入密钥后点击「保存账户」，或手动添加
          </div>
          <button
            className="btn-pri"
            style={{ marginTop: 18, display: "inline-flex" }}
            onClick={() => setModal(true)}
          >
            <IPlus /> 手动添加账户
          </button>
        </div>
      ) : (
        <div className="cards">
          {accounts.map((a) => (
            <AccountCard key={a.id} acct={a} onDelete={onDelete} />
          ))}
        </div>
      )}

      {modal && (
        <AddModal
          onAdd={(a) => {
            onAdd(a);
            setModal(false);
          }}
          onClose={() => setModal(false)}
        />
      )}
    </div>
  );
}

