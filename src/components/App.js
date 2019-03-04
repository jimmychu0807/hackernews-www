// core/data library
import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from 'react-apollo';

// Styling
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { indigo, orange } from '@material-ui/core/colors';

// Multilingual Support
import { withLocalize, Translate } from 'react-localize-redux';
import { renderToStaticMarkup } from "react-dom/server";
import enTranslation from './translations/en.json';
import zhHKTranslation from './translations/zh_HK.json';
import zhCNTranslation from './translations/zh_CN.json';

import apolloClient from '../services/ApolloClient';
import Routing from '../services/Routing';
import LanguageService from '../services/LanguageService';

// --- Components ---

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: indigo,
    secondary: orange,
  },
});

class App extends Component {

  constructor(props) {
    super(props);

    this.props.initialize({
      languages: [
        { name: "English", code: "en" },
        { name: "Traditional Chinese", code: "zh_HK" },
        { name: "Simplified Chinese", code: "zh_CN" },
      ],
      options: {
        renderToStaticMarkup,
        renderInnerHtml: true,
        defaultLanguage: LanguageService.defaultLanguage,
      },
    });
    this.props.addTranslationForLanguage(enTranslation, "en");
    this.props.addTranslationForLanguage(zhHKTranslation, "zh_HK");
    this.props.addTranslationForLanguage(zhCNTranslation, "zh_CN");
    this.props.setActiveLanguage(LanguageService.getActiveLanguage());
  }

  render() {
    return(
      <Router>
        <ApolloProvider client = { apolloClient }>
          <MuiThemeProvider theme={ theme }>
            <Suspense fallback={ <div><Translate id="misc.loading" /></div> }>
              <CssBaseline />
              <Routing />
            </Suspense>
          </MuiThemeProvider>
        </ApolloProvider>
      </Router>
    )
  }
}

export default withLocalize(App);
