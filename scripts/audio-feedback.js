(() => {
  let soundEnabled = true;
  let audioContext = null;
  let lastToneAt = 0;
  let lastWaterDropAt = 0;
  let lastUnlockAt = 0;
  const UI_TONE_GAIN = 0.06;
  const WATER_DROP_GAIN = 0.04;
  const UNLOCK_TONE_GAIN = 0.075;
  const BACKGROUND_MUSIC_SRC = "audio/liquid-light-loop.mp3";
  const BACKGROUND_MUSIC_VOLUME = 0.24;
  let backgroundAudio = null;
  let backgroundRequested = false;
  let backgroundFadeFrame = 0;

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

  const playUnlockTone = async ({ delayMs = 0 } = {}) => {
    if (!soundEnabled) return false;
    const nowMs = performance.now();
    if (nowMs - lastUnlockAt < 520) return false;

    const context = await getAudioContext().catch(() => null);
    if (!context || context.state !== "running") return false;
    lastUnlockAt = nowMs;

    const scheduledDelayMs = Number.isFinite(delayMs) ? Math.max(0, delayMs) : 0;
    const startAt = context.currentTime + scheduledDelayMs * 0.001;
    const master = context.createGain();
    const click = context.createOscillator();
    const clickGain = context.createGain();
    const clickFilter = context.createBiquadFilter();
    const latch = context.createOscillator();
    const latchGain = context.createGain();
    const latchFilter = context.createBiquadFilter();

    master.gain.setValueAtTime(UNLOCK_TONE_GAIN, startAt);
    master.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.24);

    click.type = "triangle";
    click.frequency.setValueAtTime(1480, startAt);
    click.frequency.exponentialRampToValueAtTime(980, startAt + 0.028);
    clickFilter.type = "bandpass";
    clickFilter.frequency.setValueAtTime(2100, startAt);
    clickFilter.Q.setValueAtTime(5.2, startAt);
    clickGain.gain.setValueAtTime(0.0001, startAt);
    clickGain.gain.exponentialRampToValueAtTime(0.82, startAt + 0.005);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.045);

    latch.type = "sine";
    latch.frequency.setValueAtTime(260, startAt + 0.035);
    latch.frequency.exponentialRampToValueAtTime(155, startAt + 0.145);
    latchFilter.type = "lowpass";
    latchFilter.frequency.setValueAtTime(760, startAt);
    latchFilter.Q.setValueAtTime(1.35, startAt);
    latchGain.gain.setValueAtTime(0.0001, startAt);
    latchGain.gain.setValueAtTime(0.46, startAt + 0.038);
    latchGain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.18);

    click.connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(master);
    latch.connect(latchFilter);
    latchFilter.connect(latchGain);
    latchGain.connect(master);
    master.connect(context.destination);

    click.start(startAt);
    click.stop(startAt + 0.055);
    latch.start(startAt + 0.035);
    latch.stop(startAt + 0.2);
    return true;
  };

  const getBackgroundAudio = () => {
    if (backgroundAudio) return backgroundAudio;

    backgroundAudio = new Audio(BACKGROUND_MUSIC_SRC);
    backgroundAudio.loop = true;
    backgroundAudio.preload = "none";
    backgroundAudio.volume = 0;
    return backgroundAudio;
  };

  const cancelBackgroundFade = () => {
    if (!backgroundFadeFrame) return;
    cancelAnimationFrame(backgroundFadeFrame);
    backgroundFadeFrame = 0;
  };

  const clampVolume = (value) => Math.max(0, Math.min(1, value));

  const fadeBackgroundMusic = (targetVolume, duration = 560, onDone) => {
    const audio = backgroundAudio;
    if (!audio) {
      onDone?.();
      return;
    }

    const target = clampVolume(targetVolume);
    cancelBackgroundFade();

    if (duration <= 0) {
      audio.volume = clampVolume(target);
      onDone?.();
      return;
    }

    const startVolume = audio.volume;
    const startedAt = performance.now();

    const step = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      audio.volume = clampVolume(startVolume + (target - startVolume) * eased);

      if (progress < 1) {
        backgroundFadeFrame = requestAnimationFrame(step);
        return;
      }

      backgroundFadeFrame = 0;
      audio.volume = clampVolume(target);
      onDone?.();
    };

    backgroundFadeFrame = requestAnimationFrame(step);
  };

  const playBackgroundMusic = async ({ request = true, fade = true } = {}) => {
    if (request) backgroundRequested = true;
    if (!backgroundRequested || !soundEnabled) return false;

    const audio = getBackgroundAudio();
    audio.muted = false;

    try {
      await audio.play();
      fadeBackgroundMusic(BACKGROUND_MUSIC_VOLUME, fade ? 680 : 0);
      document.body?.classList.add("music-active");
      return true;
    } catch {
      document.body?.classList.remove("music-active");
      return false;
    }
  };

  const pauseBackgroundMusic = ({ remember = false, fade = true } = {}) => {
    if (!remember) backgroundRequested = false;
    if (!backgroundAudio) return Promise.resolve(null);

    return new Promise((resolve) => {
      fadeBackgroundMusic(0, fade ? 360 : 0, () => {
        backgroundAudio.pause();
        document.body?.classList.remove("music-active");
        resolve(null);
      });
    });
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
    playUnlockTone,
    startBackgroundMusic(options) {
      return playBackgroundMusic(options);
    },
    resumeBackgroundMusic(options) {
      return playBackgroundMusic({ ...options, request: false });
    },
    pauseBackgroundMusic,
    isBackgroundMusicRequested() {
      return backgroundRequested;
    },
    getBackgroundMusicState() {
      return {
        requested: backgroundRequested,
        exists: Boolean(backgroundAudio),
        src: backgroundAudio?.currentSrc || backgroundAudio?.src || BACKGROUND_MUSIC_SRC,
        loop: Boolean(backgroundAudio?.loop),
        paused: Boolean(backgroundAudio?.paused),
        volume: backgroundAudio?.volume ?? 0,
        readyState: backgroundAudio?.readyState ?? 0,
      };
    },
    suspendAudioContext,
    setSoundEnabled(value) {
      soundEnabled = Boolean(value);
      if (!soundEnabled) {
        pauseBackgroundMusic({ remember: true });
      } else if (backgroundRequested) {
        playBackgroundMusic({ request: false }).catch(() => null);
      }
    },
    isSoundEnabled() {
      return soundEnabled;
    },
  };
})();
