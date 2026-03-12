import { useState } from "react";
import { IShield } from "./components/Icons.jsx";
import { QuickGen } from "./components/QuickGen.jsx";
import { Manager } from "./components/Manager.jsx";
import { AddModal } from "./components/AddModal.jsx";

export default function App() {
  const [tab, setTab] = useState("generate");
  const [accounts, setAccounts] = useState([
    { id: 1, username: "octocat", secret: "JBSWY3DPEHPK3PXP", color: "#f97316" },
  ]);
  const [saveModal, setSaveModal] = useState(null);

  const addAccount = (a) => { setAccounts(p => [...p, a]); setSaveModal(null); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:    #0d0d0d;
          --bg2:   #151515;
          --bg3:   #1c1c1c;
          --bg4:   #252525;
          --b:     rgba(255,255,255,.07);
          --b2:    rgba(255,255,255,.13);
          --text:  #f0f0f0;
          --muted: #888;
          --dim:   #444;
          --o:     #e8612c;
          --os:    rgba(232,97,44,.11);
          --ob:    rgba(232,97,44,.22);
          --green: #10b981;
          --red:   #ef4444;
          --r:     14px;
          --rs:    9px;
          --mono:  'JetBrains Mono', monospace;
          --sans:  'Sora', sans-serif;
        }
        body { font-family: var(--sans); background: var(--bg); color: var(--text); min-height: 100vh; -webkit-font-smoothing: antialiased; }

        /* NAV */
        .nav { height: 52px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-bottom: 1px solid var(--b); background: rgba(13,13,13,.94); backdrop-filter: blur(14px); position: sticky; top: 0; z-index: 20; }
        .nav-brand { display: flex; align-items: center; gap: 9px; font-weight: 600; font-size: 14px; letter-spacing: -.01em; }
        .nav-logo { width: 30px; height: 30px; border-radius: 8px; background: linear-gradient(135deg,#e8612c,#f97316); display: flex; align-items: center; justify-content: center; color: #fff; }
        .nav-pill { font-size: 10px; font-weight: 600; letter-spacing: .06em; padding: 3px 8px; border-radius: 20px; background: var(--os); border: 1px solid var(--ob); color: var(--o); }

        /* TABS */
        .tabs { display: flex; gap: 2px; padding: 10px 20px 0; border-bottom: 1px solid var(--b); background: var(--bg); position: sticky; top: 52px; z-index: 15; }
        .tab { display: flex; align-items: center; gap: 7px; padding: 9px 16px 10px; border: none; background: none; color: var(--muted); font-family: var(--sans); font-size: 13px; font-weight: 500; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: color .15s, border-color .15s; }
        .tab:hover { color: var(--text); }
        .tab.on { color: var(--text); border-bottom-color: var(--o); }
        .tab-badge { font-size: 10px; padding: 1px 6px; border-radius: 20px; background: var(--bg3); border: 1px solid var(--b); color: var(--muted); }
        .tab.on .tab-badge { background: var(--os); border-color: var(--ob); color: var(--o); }

        /* MAIN */
        .main { max-width: 640px; margin: 0 auto; padding: 28px 18px 72px; }

        /* QUICK GEN */
        .qg { display: flex; flex-direction: column; gap: 18px; }
        .qg-hero { display: flex; align-items: center; gap: 12px; padding: 15px; background: var(--bg2); border: 1px solid var(--b); border-radius: var(--r); }
        .qg-hero-icon { width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0; background: var(--os); border: 1px solid var(--ob); color: var(--o); display: flex; align-items: center; justify-content: center; }
        .qg-hero-title { font-size: 14px; font-weight: 600; margin-bottom: 3px; }
        .qg-hero-sub { font-size: 12px; color: var(--muted); }

        /* FIELD */
        .field { display: flex; flex-direction: column; gap: 7px; }
        .field-label { display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .07em; color: var(--muted); }
        .field-wrap { position: relative; }
        .field-input { width: 100%; padding: 11px 38px 11px 14px; background: var(--bg2); border: 1px solid var(--b); border-radius: var(--rs); color: var(--text); font-family: var(--sans); font-size: 14px; outline: none; transition: border-color .15s, box-shadow .15s; }
        .field-input:focus { border-color: var(--o); box-shadow: 0 0 0 3px var(--os); }
        .field-input::placeholder { color: var(--dim); }
        .field-input.mono { font-family: var(--mono); letter-spacing: .06em; font-size: 13px; }
        .fi-ok { border-color: rgba(16,185,129,.35) !important; }
        .fi-err { border-color: rgba(239,68,68,.35) !important; }
        .field-spin { position: absolute; right: 13px; top: 50%; transform: translateY(-50%); width: 15px; height: 15px; border: 2px solid var(--b2); border-top-color: var(--o); border-radius: 50%; animation: spin .7s linear infinite; }
        @keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }
        .field-ok { position: absolute; right: 13px; top: 50%; transform: translateY(-50%); color: var(--green); display: flex; }
        .field-err { font-size: 12px; color: #f87171; padding: 8px 12px; background: rgba(239,68,68,.07); border: 1px solid rgba(239,68,68,.14); border-radius: var(--rs); }
        .field-hint { font-size: 11px; color: var(--dim); line-height: 1.5; }

        /* RESULT */
        .result-card { background: var(--bg2); border: 1px solid var(--b); border-radius: var(--r); padding: 20px; display: flex; flex-direction: column; gap: 14px; animation: fadeUp .25s ease; transition: border-color .3s; }
        .result-card.result-urgent { border-color: rgba(239,68,68,.28); }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }
        .result-top { display: flex; align-items: center; justify-content: space-between; }
        .result-label { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .07em; color: var(--muted); }
        .live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); box-shadow: 0 0 6px var(--green); animation: blink 2s infinite; }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:.3;} }
        .result-body { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
        .result-btns { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .result-foot { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid var(--b); font-size: 11px; color: var(--dim); }
        .txt-urgent { color: #f87171; font-weight: 600; }

        .result-empty { border: 1.5px dashed var(--b); border-radius: var(--r); padding: 40px 20px; text-align: center; }
        .empty-digits { display: flex; align-items: center; justify-content: center; gap: 3px; margin-bottom: 12px; }
        .ed { font-family: var(--mono); font-size: 32px; font-weight: 700; color: var(--bg4); }
        .ed-gap { margin-left: 10px; }
        .empty-hint { font-size: 12px; color: var(--dim); }

        /* CODE */
        .code { display: flex; align-items: center; gap: 1px; font-family: var(--mono); font-size: 26px; font-weight: 700; letter-spacing: .04em; }
        .code-lg { font-size: 36px; }
        .code-urgent { color: #f87171; }
        .code-flash .code-d { animation: codePop .35s ease both; }
        @keyframes codePop { 0%{transform:scale(.8);opacity:.3;} 60%{transform:scale(1.06);} 100%{transform:scale(1);opacity:1;} }
        .code-d { display: inline-flex; align-items: center; }
        .code-sep { display: inline-block; width: 8px; height: 2px; background: var(--b2); border-radius: 2px; margin: 0 5px; }

        /* BUTTONS */
        .btn-copy { display: flex; align-items: center; gap: 6px; padding: 8px 14px; background: var(--bg3); border: 1px solid var(--b); border-radius: var(--rs); color: var(--muted); font-family: var(--sans); font-size: 12px; cursor: pointer; transition: all .15s; white-space: nowrap; }
        .btn-copy:hover { border-color: var(--o); color: var(--o); background: var(--os); }
        .btn-copy.copied { color: var(--green); border-color: rgba(16,185,129,.25); background: rgba(16,185,129,.07); }
        .btn-copy-lg { padding: 10px 18px; font-size: 13px; }
        .btn-save { display: flex; align-items: center; gap: 6px; padding: 10px 16px; background: var(--os); border: 1px solid var(--ob); border-radius: var(--rs); color: var(--o); font-family: var(--sans); font-size: 13px; cursor: pointer; transition: background .15s; white-space: nowrap; }
        .btn-save:hover { background: var(--ob); }
        .btn-pri { display: flex; align-items: center; gap: 6px; padding: 10px 18px; background: var(--o); border: none; border-radius: var(--rs); color: #fff; font-family: var(--sans); font-size: 13px; font-weight: 600; cursor: pointer; transition: opacity .15s, transform .15s; }
        .btn-pri:hover { opacity: .87; transform: translateY(-1px); }
        .btn-sec { flex: 1; padding: 10px; background: var(--bg3); border: 1px solid var(--b); color: var(--muted); border-radius: var(--rs); font-family: var(--sans); font-size: 13px; cursor: pointer; transition: all .15s; }
        .btn-sec:hover { border-color: var(--b2); color: var(--text); }

        /* HOW-TO */
        .howto { background: var(--bg2); border: 1px solid var(--b); border-radius: var(--r); padding: 16px 18px; display: flex; flex-direction: column; gap: 10px; }
        .howto-title { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .07em; color: var(--muted); }
        .howto-row { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: var(--muted); }
        .howto-n { width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0; background: var(--bg3); border: 1px solid var(--b2); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: var(--o); }

        /* MANAGER */
        .mgr-hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .mgr-title { font-size: 17px; font-weight: 600; letter-spacing: -.02em; margin-bottom: 4px; }
        .mgr-sub { font-size: 12px; color: var(--muted); }
        .btn-add-acct { display: flex; align-items: center; gap: 6px; padding: 9px 16px; background: var(--o); border: none; border-radius: var(--rs); color: #fff; font-family: var(--sans); font-size: 13px; font-weight: 600; cursor: pointer; transition: opacity .15s; flex-shrink: 0; }
        .btn-add-acct:hover { opacity: .87; }

        .cards { display: flex; flex-direction: column; gap: 10px; }
        .acard { background: var(--bg2); border: 1px solid var(--b); border-radius: var(--r); padding: 16px 18px; transition: border-color .2s; animation: fadeUp .2s ease; }
        .acard:hover { border-color: var(--b2); }
        .acard.acard-urgent { border-color: rgba(239,68,68,.25); }
        .acard-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .acard-id { display: flex; align-items: center; gap: 10px; }
        .acard-av { width: 34px; height: 34px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; color: #fff; flex-shrink: 0; }
        .acard-name { font-size: 14px; font-weight: 600; letter-spacing: -.01em; margin-bottom: 3px; }
        .acard-sub { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--muted); }
        .acard-del { background: none; border: none; color: var(--dim); cursor: pointer; padding: 6px; border-radius: var(--rs); display: flex; transition: all .15s; }
        .acard-del:hover { color: var(--red); background: rgba(239,68,68,.08); }
        .acard-bot { display: flex; align-items: center; justify-content: space-between; gap: 12px; }

        /* EMPTY */
        .empty { text-align: center; padding: 52px 20px; }
        .empty-icon { width: 50px; height: 50px; border-radius: 14px; background: var(--bg2); border: 1px solid var(--b); display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; color: var(--dim); }
        .empty-title { font-size: 15px; font-weight: 600; margin-bottom: 6px; }
        .empty-sub { font-size: 13px; color: var(--muted); line-height: 1.6; }

        /* MODAL */
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,.72); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 16px; animation: fIn .18s; }
        @keyframes fIn { from{opacity:0;} to{opacity:1;} }
        .modal { background: var(--bg2); border: 1px solid var(--b2); border-radius: 18px; padding: 24px; width: 100%; max-width: 420px; display: flex; flex-direction: column; gap: 16px; animation: mIn .22s ease; }
        @keyframes mIn { from{opacity:0;transform:scale(.93) translateY(12px);} to{opacity:1;transform:scale(1) translateY(0);} }
        .modal-hd { display: flex; align-items: center; gap: 12px; }
        .modal-icon { width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0; background: var(--bg3); border: 1px solid var(--b2); display: flex; align-items: center; justify-content: center; color: var(--muted); }
        .modal-title { font-size: 16px; font-weight: 600; letter-spacing: -.02em; }
        .modal-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }
        .modal-actions { display: flex; gap: 10px; }

        /* FOOTER */
        .footer { border-top: 1px solid var(--b); padding: 13px 20px; text-align: center; font-size: 11px; color: var(--dim); }

        /* RESPONSIVE */
        @media (max-width: 520px) {
          .tabs { padding: 8px 14px 0; }
          .tab { padding: 8px 10px 9px; font-size: 12px; }
          .main { padding: 16px 14px 56px; }
          .code { font-size: 22px; }
          .code-lg { font-size: 28px; }
          .ed { font-size: 24px; }
          .nav-pill { display: none; }
        }
        @media (max-width: 400px) {
          .code { font-size: 18px; }
          .code-lg { font-size: 22px; }
          .btn-copy span { display: none; }
          .acard-sub { display: none; }
        }
      `}</style>

      <nav className="nav">
        <div className="nav-brand">
          <div className="nav-logo">
            <IShield />
          </div>
          2FA Authenticator
        </div>
        <span className="nav-pill">GITHUB</span>
      </nav>

      <div className="tabs">
        <button className={`tab ${tab === "generate" ? "on" : ""}`} onClick={() => setTab("generate")}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
            <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
          快速生成
        </button>
        <button className={`tab ${tab === "manage" ? "on" : ""}`} onClick={() => setTab("manage")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
          账户管理
          <span className="tab-badge">{accounts.length}</span>
        </button>
      </div>

      <main className="main">
        {tab === "generate"
          ? <QuickGen onSave={secret => { setSaveModal(secret); setTab("manage"); }} />
          : <Manager accounts={accounts} onAdd={addAccount} onDelete={id => setAccounts(p => p.filter(a => a.id !== id))} />
        }
      </main>

      <footer className="footer">
        密钥仅保存于内存，刷新后自动清除 · 所有计算在本地完成，不上传任何数据
      </footer>

      {saveModal !== null && (
        <AddModal prefill={saveModal} onAdd={addAccount} onClose={() => setSaveModal(null)} />
      )}
    </>
  );
}
