"use client";

import { useCallback, useEffect, useRef } from "react";

// Generates a short sound effect using Web Audio API
// No external audio files needed — all sounds are synthesized

function createAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    return new AudioContext();
  } catch {
    return null;
  }
}

function playWhooshSound(ctx: AudioContext) {
  const now = ctx.currentTime;
  const duration = 0.6;

  // White noise filtered through a bandpass for a whoosh
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1000, now);
  filter.frequency.exponentialRampToValueAtTime(300, now + duration);
  filter.Q.value = 1.5;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(now);
  source.stop(now + duration);
}

function playImpactSound(ctx: AudioContext) {
  const now = ctx.currentTime;

  // Low thud
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.exponentialRampToValueAtTime(40, now + 0.3);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.4, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.3);

  // Click transient
  const click = ctx.createOscillator();
  click.type = "square";
  click.frequency.value = 800;

  const clickGain = ctx.createGain();
  clickGain.gain.setValueAtTime(0.15, now);
  clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

  click.connect(clickGain);
  clickGain.connect(ctx.destination);
  click.start(now);
  click.stop(now + 0.05);
}

function playChimeSound(ctx: AudioContext) {
  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;

    const gain = ctx.createGain();
    const start = now + i * 0.1;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.15, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, start + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.6);
  });
}

export function useSoundEffects() {
  const ctxRef = useRef<AudioContext | null>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      reducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }
  }, []);

  const ensureContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = createAudioContext();
    }
    // Resume if suspended (browser autoplay policy)
    if (ctxRef.current?.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const playWhoosh = useCallback(() => {
    if (reducedMotion.current) return;
    const ctx = ensureContext();
    if (ctx) playWhooshSound(ctx);
  }, [ensureContext]);

  const playImpact = useCallback(() => {
    if (reducedMotion.current) return;
    const ctx = ensureContext();
    if (ctx) playImpactSound(ctx);
  }, [ensureContext]);

  const playChime = useCallback(() => {
    if (reducedMotion.current) return;
    const ctx = ensureContext();
    if (ctx) playChimeSound(ctx);
  }, [ensureContext]);

  return { playWhoosh, playImpact, playChime };
}
