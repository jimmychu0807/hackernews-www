import React, { Component, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';

import '../styles/App.css';
import Routing from '../services/Routing';

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
})

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <ApolloProvider client = { client }>
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
