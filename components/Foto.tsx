// Espacio para una foto real. Mientras no exista, muestra un fondo neutro con lo que debe ir ahí.
import type { CSSProperties } from "react";

export function Foto({
  etiqueta,
  pendiente,
  clara = false,
  className = "",
  style,
  src,
}: {
  etiqueta: string;
  pendiente?: string;
  clara?: boolean;
  className?: string;
  style?: CSSProperties;
  src?: string;
}) {
  return (
    <div className={`foto ${clara ? "clara" : ""} ${className}`} style={style}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="foto-fondo" src={src} alt={etiqueta} style={{ width: "100%", height: "124%", objectFit: "cover" }} />
      ) : (
        <div className="foto-fondo" aria-hidden="true" />
      )}
      {!src && (
        <div className="foto-etq">
          <span>{etiqueta}</span>
          {pendiente && <span>{pendiente}</span>}
        </div>
      )}
    </div>
  );
}
