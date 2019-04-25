import { renderToStaticMarkup } from "react-dom/server";

// Translations
import enTranslation from './translations/en.json';
import zhHKTranslation from './translations/zh_HK.json';
import zhCNTranslation from './translations/zh_CN.json';

const DEFAULT_LANGUAGE = "en";

const LanguageService = {
  initializeAppProps(props) {
    let currentCode = null;
    try {
      currentCode = localStorage.getItem('langCode') || DEFAULT_LANGUAGE;
    } catch (err) {
      currentCode = DEFAULT_LANGUAGE;
    }

    props.initialize({
      languages: [
        { name: "English", code: "en" },
        { name: "Traditional Chinese", code: "zh_HK" },
        { name: "Simplified Chinese", code: "zh_CN" },
      ],
      options: {
        renderToStaticMarkup,
        renderInnerHtml: true,
        defaultLanguage: DEFAULT_LANGUAGE,
      },
    });

    props.addTranslationForLanguage(enTranslation, "en");
    props.addTranslationForLanguage(zhHKTranslation, "zh_HK");
    props.addTranslationForLanguage(zhCNTranslation, "zh_CN");
    props.setActiveLanguage(currentCode);
  }
}

export default LanguageService;
