(() => {
  const runtime = window.LucianRuntime;
  if (!runtime) return;

  const soundToggle = document.querySelector("#sound-toggle");
  const fullscreenToggle = document.querySelector("#fullscreen-toggle");
  const SOUND_STORAGE_KEY = "lucianYangSoundEnabled";

  const readStoredBoolean = (key, fallback) => {
    try {
      const value = window.localStorage.getItem(key);
      if (value === null) return fallback;
      return value === "1";
    } catch {
      return fallback;
    }
  };

  const writeStoredBoolean = (key, value) => {
    try {
      window.localStorage.setItem(key, value ? "1" : "0");
    } catch {
      // Ignore storage failures and keep the in-memory preference.
    }
  };

  const applySoundState = () => {
    const enabled = runtime.isSoundEnabled();
    document.body.classList.toggle("sound-muted", !enabled);
    soundToggle?.setAttribute("aria-pressed", String(enabled));
    soundToggle?.setAttribute(
      "aria-label",
      enabled ? "Mute interface sounds" : "Enable interface sounds"
    );
  };

  soundToggle?.addEventListener("click", async () => {
    const enabled = !runtime.isSoundEnabled();
    runtime.setSoundEnabled(enabled);
    applySoundState();
    writeStoredBoolean(SOUND_STORAGE_KEY, enabled);

    if (enabled) {
      await runtime.getAudioContext().catch(() => null);
      runtime.playUiTone("click");
      return;
    }

    await runtime.suspendAudioContext();
  });

  const isFullscreenActive = () => Boolean(document.fullscreenElement);

  const updateFullscreenState = () => {
    const active = isFullscreenActive();
    document.body.classList.toggle("is-fullscreen", active);
    fullscreenToggle?.setAttribute("aria-pressed", String(active));
    fullscreenToggle?.setAttribute("aria-label", active ? "Exit fullscreen" : "Enter fullscreen");
  };

  fullscreenToggle?.addEventListener("click", async () => {
    try {
      if (isFullscreenActive()) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen({ navigationUI: "hide" });
      }
    } catch {
      // Fullscreen can be blocked by browser policy; keep the UI in the current state.
    } finally {
      updateFullscreenState();
    }
  });

  document.addEventListener("fullscreenchange", updateFullscreenState);

  runtime.setSoundEnabled(readStoredBoolean(SOUND_STORAGE_KEY, true));
  applySoundState();
  updateFullscreenState();
})();

