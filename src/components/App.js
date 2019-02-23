import React, { Component, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from 'react-apollo';

import '../styles/App.css';
import apolloClient from '../services/ApolloClient';
import Routing from '../services/Routing';

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <ApolloProvider client = { apolloClient }>
          <Suspense fallback={ <div>Loading...</div> }>
            <CssBaseline />
            <Routing />
          </Suspense>
        </ApolloProvider>
      </BrowserRouter>
    )
  }
}

export default App;
