(() => {
  const video = document.querySelector("#hero-tv-video");
  const cabinet = document.querySelector(".hero-tv-cabinet");
  const soundToggle = document.querySelector("#hero-tv-sound-toggle");
  const replayToggle = document.querySelector("#hero-tv-replay-toggle");
  if (!video || !(video instanceof HTMLVideoElement) || !soundToggle || !replayToggle) return;

  const TV_VOLUME = 0.86;

  const setSoundButtonState = (enabled) => {
    cabinet?.classList.toggle("is-tv-sound-on", enabled);
    soundToggle.setAttribute("aria-pressed", String(enabled));
    soundToggle.setAttribute(
      "aria-label",
      enabled ? "Mute TV video sound" : "Turn TV sound on"
    );
    soundToggle.title = enabled ? "Mute TV sound" : "Turn TV sound on";
  };

  const setTvSound = async (enabled) => {
    const shouldEnable = Boolean(enabled);
    video.volume = TV_VOLUME;

    if (shouldEnable) {
      try {
        await video.play();
      } catch {
        // The next play attempt may still succeed after the user gesture below.
      }

      video.muted = false;
      video.removeAttribute("muted");

      try {
        await video.play();
      } catch {
        video.muted = true;
        video.setAttribute("muted", "");
        await video.play().catch(() => null);
      }
    } else {
      video.muted = true;
      video.setAttribute("muted", "");
      await video.play().catch(() => null);
    }

    setSoundButtonState(!video.muted && video.volume > 0);
  };

  const replayVideo = async () => {
    cabinet?.classList.add("is-tv-replaying");
    try {
      video.currentTime = 0;
      await video.play();
    } catch {
      // Keep the current video state if replay is blocked.
    } finally {
      window.setTimeout(() => {
        cabinet?.classList.remove("is-tv-replaying");
      }, 260);
    }
  };

  soundToggle.addEventListener("click", async () => {
    await setTvSound(video.muted);
    window.LucianRuntime?.playUiTone?.("click");
  });

  replayToggle.addEventListener("click", async () => {
    await replayVideo();
    window.LucianRuntime?.playUiTone?.("click");
  });

  video.addEventListener("volumechange", () => {
    setSoundButtonState(!video.muted && video.volume > 0);
  });

  replayToggle.title = "Replay TV video";
  setSoundButtonState(!video.muted && video.volume > 0);
})();