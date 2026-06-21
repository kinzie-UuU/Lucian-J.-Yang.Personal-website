window.initLanguageRuntime = ({
  initialLang = "zh",
  langButtons = [],
  onChange,
} = {}) => {
  let currentLang = initialLang;

  const switchLanguage = (lang) => {
    currentLang = lang;
    window.LucianScrambledText?.restore?.();
    window.LucianStaticText?.update?.(currentLang, { langButtons });
    window.LucianFlipText?.refresh?.();
    window.LucianScrambledText?.init?.();
    window.LucianAboutScrollReveal?.refresh?.();
    window.LucianWorksFlowingMenu?.refresh?.();
    window.rebuildServicesStoryText?.();
    onChange?.(currentLang);
    window.LucianWorkGallery?.refreshLanguage?.();
    window.LucianWorkInfiniteGallery?.refreshLanguage?.();
  };

  return {
    switchLanguage,
    getCurrentLang() {
      return currentLang;
    },
  };
};
