"use client";
import { useState } from "react";

export function Copiar({ valor, texto, hecho }: { valor: string; texto: string; hecho: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className="copiar"
      onClick={() => {
        navigator.clipboard
          ?.writeText(valor)
          .then(() => {
            setOk(true);
            setTimeout(() => setOk(false), 2000);
          })
          .catch(() => {});
      }}
    >
      {ok ? hecho : texto}
    </button>
  );
}
