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
    window.LucianScrambledText?.init?.();
    window.LucianWorksFlowingMenu?.refresh?.();
    window.rebuildServicesStoryText?.();
    onChange?.(currentLang);
    window.LucianWorkGallery?.refreshLanguage?.();
  };

  return {
    switchLanguage,
    getCurrentLang() {
      return currentLang;
    },
  };
};
