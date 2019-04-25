// core/data library
import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import store from '../services/redux/configureStore';

// Styling
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { indigo, orange } from '@material-ui/core/colors';

// Multilingual Support
import { withLocalize, Translate } from 'react-localize-redux';

import Routing from './Routing';
import apolloClient from '../services/ApolloClient';
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
    LanguageService.initializeAppProps(props);
  }

  render() {
    return(
      <Router>
        <ApolloProvider client = { apolloClient }>
          <Provider store={store}>
            <MuiThemeProvider theme={ theme }>
              <Suspense fallback={ <div><Translate id="misc.loading" /></div> }>
                <CssBaseline />
                <Routing />
              </Suspense>
            </MuiThemeProvider>
          </Provider>
        </ApolloProvider>
      </Router>
    )
  }
}

export default withLocalize(App);
