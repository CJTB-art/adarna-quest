// ============================================================
//  SOUND EFFECTS — Web Audio API (no extra packages)
//  Uses the browser's built-in AudioContext to play
//  short tones for correct/wrong feedback.
//  Set SOUNDS_ENABLED = false to disable all sounds.
// ============================================================

const SOUNDS_ENABLED = true

function createContext() {
  if (!SOUNDS_ENABLED) return null
  try {
    return new (window.AudioContext || window.webkitAudioContext)()
  } catch {
    return null
  }
}

function playTone(ctx, { freq = 440, type = 'sine', duration = 0.15, gain = 0.3, delay = 0 }) {
  if (!ctx) return
  try {
    const osc = ctx.createOscillator()
    const vol = ctx.createGain()
    osc.connect(vol)
    vol.connect(ctx.destination)
    osc.frequency.value = freq
    osc.type = type
    vol.gain.setValueAtTime(0, ctx.currentTime + delay)
    vol.gain.linearRampToValueAtTime(gain, ctx.currentTime + delay + 0.01)
    vol.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration)
    osc.start(ctx.currentTime + delay)
    osc.stop(ctx.currentTime  + delay + duration + 0.05)
  } catch { /* silently fail */ }
}

// ── Sound presets ────────────────────────────────────────
export function useSound() {
  let ctx = null
  function getCtx() {
    if (!ctx) ctx = createContext()
    return ctx
  }

  return {
    // ✅ Correct answer — rising two-tone chime
    playCorrect() {
      const c = getCtx()
      playTone(c, { freq: 523, type: 'sine',     duration: 0.18, gain: 0.25, delay: 0 })
      playTone(c, { freq: 784, type: 'sine',     duration: 0.22, gain: 0.25, delay: 0.12 })
      playTone(c, { freq: 1047,type: 'triangle', duration: 0.3,  gain: 0.2,  delay: 0.26 })
    },

    // ❌ Wrong answer — low dull thud
    playWrong() {
      const c = getCtx()
      playTone(c, { freq: 200, type: 'sawtooth', duration: 0.2, gain: 0.15, delay: 0 })
      playTone(c, { freq: 160, type: 'square',   duration: 0.2, gain: 0.1,  delay: 0.08 })
    },

    // 🎉 Tile reveal — sparkle
    playReveal() {
      const c = getCtx()
      playTone(c, { freq: 880,  type: 'sine', duration: 0.1, gain: 0.15, delay: 0 })
      playTone(c, { freq: 1175, type: 'sine', duration: 0.1, gain: 0.12, delay: 0.08 })
    },

    // 🏆 All done — fanfare
    playFanfare() {
      const c = getCtx()
      const notes = [523, 659, 784, 1047]
      notes.forEach((freq, i) => {
        playTone(c, { freq, type: 'sine', duration: 0.25, gain: 0.2, delay: i * 0.15 })
      })
    },

    // ➜ Navigation click — soft tick
    playClick() {
      const c = getCtx()
      playTone(c, { freq: 660, type: 'sine', duration: 0.08, gain: 0.1, delay: 0 })
    },
  }
}
