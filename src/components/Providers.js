// core/data library
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

// redux
import { Provider } from 'react-redux';
import configureStore from '../services/redux/configureStore';

// Multilingual support
import { LocalizeProvider } from 'react-localize-redux';

// Styling
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { indigo, orange } from '@material-ui/core/colors';

import apolloClient from '../services/ApolloClient';

// --- components ---

const store = configureStore();

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: indigo,
    secondary: orange,
  },
});

const Providers = (props) =>
  <Router>
    <ApolloProvider client={apolloClient}>
      <LocalizeProvider store={store}>
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            { props.children }
          </MuiThemeProvider>
        </Provider>
      </LocalizeProvider>
    </ApolloProvider>
  </Router>

export default Providers;
