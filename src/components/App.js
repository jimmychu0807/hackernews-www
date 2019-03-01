// core/data library
import React, { Component, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from 'react-apollo';

import apolloClient from '../services/ApolloClient';
import Routing from '../services/Routing';

// Styling
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { indigo, orange } from '@material-ui/core/colors';

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
  render() {
    return(
      <BrowserRouter>
        <ApolloProvider client = { apolloClient }>
          <MuiThemeProvider theme={ theme }>
            <Suspense fallback={ <div>Loading...</div> }>
              <CssBaseline />
              <Routing />
            </Suspense>
          </MuiThemeProvider>
        </ApolloProvider>
      </BrowserRouter>
    )
  }
}

export default App;
