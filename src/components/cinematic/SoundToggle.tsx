"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Opt-in ambient bed only. Never autoplays audible media.
 * Uses a tiny generated oscillator bed when enabled — no external audio file required.
 */
export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ osc: OscillatorNode; gain: GainNode } | null>(null);

  useEffect(() => {
    return () => {
      nodesRef.current?.osc.stop();
      void ctxRef.current?.close();
    };
  }, []);

  async function toggle() {
    if (enabled) {
      nodesRef.current?.osc.stop();
      nodesRef.current = null;
      await ctxRef.current?.close();
      ctxRef.current = null;
      setEnabled(false);
      return;
    }

    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 86;
    gain.gain.value = 0.012;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    ctxRef.current = ctx;
    nodesRef.current = { osc, gain };
    setEnabled(true);
  }

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      aria-pressed={enabled}
      className="pointer-events-auto fixed right-4 bottom-4 z-40 border border-white/20 bg-black/50 px-3 py-2 font-mono text-[10px] tracking-[0.2em] text-white/60 uppercase backdrop-blur-sm hover:text-white md:right-6 md:bottom-6"
    >
      Sound {enabled ? "on" : "off"}
    </button>
  );
}
