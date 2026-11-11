"use client";
import Image from "next/image";
import { useState } from "react";

export default function Gallery({ images, title, priority = false }: { images: string[]; title: string; priority?: boolean }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-peach/30">
        <Image src={images[i]} alt={`${title}, imagen ${i + 1} de ${images.length}`} fill priority={priority} sizes="(min-width:768px) 480px, 100vw" className="object-cover" />
      </div>
      <div className="mt-3 flex gap-2">
        {images.map((src, k) => (
          <button key={src} onClick={() => setI(k)} aria-label={`Ver imagen ${k + 1}`} aria-current={k === i}
                  className={`relative h-16 w-16 overflow-hidden rounded-lg ring-2 transition ${k === i ? "ring-brand-strong" : "ring-transparent hover:ring-peach"}`}>
            <Image src={src} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
