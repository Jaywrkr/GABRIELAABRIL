"use client";
// Estado compartido del tono elegido en la guía de color: lo leen la guía (DOM) y el diente 3D.
import { useSyncExternalStore } from "react";

let indice = 3; // A1
const oyentes = new Set<() => void>();

export function elegirTono(i: number) {
  indice = i;
  oyentes.forEach((f) => f());
}
export function tonoActual() {
  return indice;
}
function suscribir(f: () => void) {
  oyentes.add(f);
  return () => oyentes.delete(f);
}
export function useTono() {
  return useSyncExternalStore(suscribir, tonoActual, () => 3);
}
