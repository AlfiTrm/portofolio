"use client";

import { useCallback, useRef } from "react";

type SoundType = "activate" | "deactivate" | "hover" | "click";

const soundUrls: Record<SoundType, string> = {
  activate: "/sounds/activate.mp3",
  deactivate: "/sounds/deactivate.mp3",
  hover: "/sounds/hover.mp3",
  click: "/sounds/click.mp3",
};

export function useSoundEffects(enabled: boolean = true) {
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  const playSound = useCallback(
    (type: SoundType, volume: number = 0.3) => {
      if (!enabled || typeof window === "undefined") return;

      try {
        if (!audioRefs.current[type]) {
          const audio = new Audio(soundUrls[type]);
          audio.volume = volume;
          audioRefs.current[type] = audio;
        }

        const audio = audioRefs.current[type];
        audio.currentTime = 0;
        audio.volume = volume;
        audio.play().catch(() => {
        });
      } catch {
      }
    },
    [enabled]
  );

  const stopSound = useCallback((type: SoundType) => {
    const audio = audioRefs.current[type];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, []);

  return { playSound, stopSound };
}
