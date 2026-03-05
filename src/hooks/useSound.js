const SOUNDS_ENABLED = true
const BGM_AUDIO_SRC = '/audio/bg-music.mp3'

let sharedCtx = null
let bgmAudio = null
let bgmStarted = false
let bgmFallbackTimer = null

function createContext() {
  if (!SOUNDS_ENABLED) return null
  try {
    return new (window.AudioContext || window.webkitAudioContext)()
  } catch {
    return null
  }
}

function ensureCtx() {
  if (!sharedCtx) sharedCtx = createContext()
  return sharedCtx
}

function playTone(ctx, { freq = 440, type = 'sine', duration = 0.15, gain = 0.3, delay = 0 }) {
  if (!ctx) return
  try {
    if (ctx.state === 'suspended') ctx.resume()
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
    osc.stop(ctx.currentTime + delay + duration + 0.05)
  } catch {
    // ignore playback errors
  }
}

function startFallbackBgm(ctx) {
  if (!ctx || bgmFallbackTimer) return
  const chords = [
    [220, 277, 330],
    [196, 247, 294],
    [174, 220, 261],
    [196, 247, 311],
  ]
  let idx = 0
  const playChord = () => {
    const chord = chords[idx % chords.length]
    chord.forEach((freq, i) => {
      playTone(ctx, {
        freq,
        type: 'triangle',
        duration: 1.8,
        gain: 0.03,
        delay: i * 0.05,
      })
    })
    idx += 1
  }
  playChord()
  bgmFallbackTimer = setInterval(playChord, 2200)
}

function stopFallbackBgm() {
  if (!bgmFallbackTimer) return
  clearInterval(bgmFallbackTimer)
  bgmFallbackTimer = null
}

export function useSound() {
  function getCtx() {
    return ensureCtx()
  }

  return {
    playCorrect() {
      const c = getCtx()
      playTone(c, { freq: 523, type: 'sine', duration: 0.18, gain: 0.25, delay: 0 })
      playTone(c, { freq: 784, type: 'sine', duration: 0.22, gain: 0.25, delay: 0.12 })
      playTone(c, { freq: 1047, type: 'triangle', duration: 0.3, gain: 0.2, delay: 0.26 })
    },

    playWrong() {
      const c = getCtx()
      playTone(c, { freq: 200, type: 'sawtooth', duration: 0.2, gain: 0.15, delay: 0 })
      playTone(c, { freq: 160, type: 'square', duration: 0.2, gain: 0.1, delay: 0.08 })
    },

    playReveal() {
      const c = getCtx()
      playTone(c, { freq: 880, type: 'sine', duration: 0.1, gain: 0.15, delay: 0 })
      playTone(c, { freq: 1175, type: 'sine', duration: 0.1, gain: 0.12, delay: 0.08 })
    },

    playFanfare() {
      const c = getCtx()
      const notes = [523, 659, 784, 1047]
      notes.forEach((freq, i) => {
        playTone(c, { freq, type: 'sine', duration: 0.25, gain: 0.2, delay: i * 0.15 })
      })
    },

    playClick() {
      const c = getCtx()
      playTone(c, { freq: 660, type: 'sine', duration: 0.08, gain: 0.1, delay: 0 })
    },

    startBgm() {
      if (!SOUNDS_ENABLED || bgmStarted) return
      bgmStarted = true

      if (!bgmAudio) {
        bgmAudio = new Audio(BGM_AUDIO_SRC)
        bgmAudio.loop = true
        bgmAudio.volume = 0.22
        bgmAudio.preload = 'auto'
      }

      bgmAudio
        .play()
        .catch(() => {
          const c = getCtx()
          startFallbackBgm(c)
        })
    },

    stopBgm() {
      bgmStarted = false
      if (bgmAudio) {
        bgmAudio.pause()
        bgmAudio.currentTime = 0
      }
      stopFallbackBgm()
    },
  }
}
