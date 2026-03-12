import { useState } from "react";
import { IPlus, IGithub } from "./Icons.jsx";
import { AccountCard } from "./AccountCard.jsx";
import { AddModal } from "./AddModal.jsx";

export function Manager({ accounts, onAdd, onDelete }) {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <div className="mgr-hd">
        <div>
          <div className="mgr-title">账户管理</div>
          <div className="mgr-sub">
            已保存 {accounts.length} 个账户，实时显示验证码
          </div>
        </div>
        <button
          className="btn-add-acct"
          onClick={() => setModal(true)}
        >
          <IPlus /> 添加
        </button>
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

