"use client";
import { useEffect, useState } from "react";

export function useMedia(query: string, inicial = false) {
  const [v, setV] = useState(inicial);
  useEffect(() => {
    const m = window.matchMedia(query);
    const f = () => setV(m.matches);
    f();
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, [query]);
  return v;
}

export const useMovil = () => useMedia("(max-width: 760px), (pointer: coarse)");
export const useReducido = () => useMedia("(prefers-reduced-motion: reduce)");

// WebGL disponible y no desactivado por el sistema
export function useWebGL() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setOk(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}
