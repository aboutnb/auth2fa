import { useTOTP } from "../utils/totp.js";
import { IGithub, ITrash } from "./Icons.jsx";
import { Code } from "./Code.jsx";
import { CopyBtn } from "./CopyBtn.jsx";
import { Ring } from "./Ring.jsx";

export function AccountCard({ acct, onDelete }) {
  const { code, progress, remaining, flash } = useTOTP(acct.secret);
  const urgent = remaining <= 7;

  return (
    <div className={`acard ${urgent ? "acard-urgent" : ""}`}>
      <div className="acard-top">
        <div className="acard-id">
          <div
            className="acard-av"
            style={{ background: acct.color }}
          >
            {acct.username?.[0]?.toUpperCase() || "G"}
          </div>
          <div>
            <div className="acard-name">{acct.username}</div>
            <div className="acard-sub">
              <IGithub /> GitHub TOTP
            </div>
          </div>
        </div>
        <button
          className="acard-del"
          onClick={() => onDelete(acct.id)}
        >
          <ITrash />
        </button>
      </div>
      <div className="acard-bot">
        <Code code={code} flash={flash} urgent={urgent} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <CopyBtn text={code} />
          <Ring progress={progress} remaining={remaining} size={34} />
        </div>
      </div>
    </div>
  );
}

