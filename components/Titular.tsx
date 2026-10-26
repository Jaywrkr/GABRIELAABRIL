"use client";
// Titular editorial: las líneas suben desde una máscara al entrar en pantalla (GSAP SplitText).
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, type ElementType, type ReactNode } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);

export function Titular({
  as: Tag = "h2",
  children,
  className,
  alCargar = false,
  retraso = 0,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  alCargar?: boolean;
  retraso?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      let anim: gsap.core.Tween | null = null;
      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "linea-split",
        autoSplit: true,
        onSplit(self) {
          anim?.kill();
          anim = gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.15,
            ease: "expo.out",
            stagger: 0.09,
            delay: retraso,
            scrollTrigger: alCargar ? undefined : { trigger: el, start: "top 88%", once: true },
          });
          return anim;
        },
      });
      return () => split.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
