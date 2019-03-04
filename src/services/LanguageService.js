const LanguageService = {

  defaultLanguage: "en",

  setActiveLanguage (langCode) {
    localStorage.setItem('langCode', langCode);
  },

  getActiveLanguage () {
    return (localStorage.getItem('langCode') || this.defaultLanguage);
  }
}

export default LanguageService;
