(() => {
  let soundEnabled = true;
  let audioContext = null;
  let lastToneAt = 0;
  let lastWaterDropAt = 0;
  const UI_TONE_GAIN = 0.06;
  const WATER_DROP_GAIN = 0.04;

  const getAudioContext = async () => {
    if (!soundEnabled) return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!audioContext) {
      audioContext = new AudioCtx();
    }
    if (audioContext.state === "suspended") {
      await audioContext.resume().catch(() => null);
    }
    return audioContext;
  };

  const playUiTone = async (type = "hover") => {
    if (!soundEnabled) return;
    if (type === "hover") return;

    const nowMs = performance.now();
    if (nowMs - lastToneAt < 180) return;
    lastToneAt = nowMs;

    const context = await getAudioContext().catch(() => null);
    if (!context || context.state !== "running") return;

    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    const base = 620;

    osc.type = "sine";
    osc.frequency.setValueAtTime(base, now);
    osc.frequency.exponentialRampToValueAtTime(base * 0.72, now + 0.1);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(UI_TONE_GAIN, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  };

  const playWaterDrop = async () => {
    if (!soundEnabled) return;
    const nowMs = performance.now();
    if (nowMs - lastWaterDropAt < 420) return;
    lastWaterDropAt = nowMs;

    const context = await getAudioContext().catch(() => null);
    if (!context) return;

    if (context.state === "suspended") {
      await context.resume().catch(() => null);
    }

    if (context.state !== "running") return;

    const now = context.currentTime;
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    const osc = context.createOscillator();

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1500, now);
    filter.Q.setValueAtTime(0.7, now);

    osc.type = "sine";
    osc.frequency.setValueAtTime(720, now);
    osc.frequency.exponentialRampToValueAtTime(390, now + 0.11);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(WATER_DROP_GAIN, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  };

  const suspendAudioContext = () => (
    audioContext?.state === "running"
      ? audioContext.suspend().catch(() => null)
      : Promise.resolve(null)
  );

  window.LucianAudio = {
    getAudioContext,
    playUiTone,
    playWaterDrop,
    suspendAudioContext,
    setSoundEnabled(value) {
      soundEnabled = Boolean(value);
    },
    isSoundEnabled() {
      return soundEnabled;
    },
  };
})();
