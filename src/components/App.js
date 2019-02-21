import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';

import '../styles/App.css';

const MainLayout = lazy(() => import("./Layout/MainLayout"));
const Links = lazy(() => import("./Links"));
const Search = lazy(() => import("./Search"));
const Login = lazy(() => import("./Login"));

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
            <Route exact path="/" render={ props =>
              <MainLayout><Links {...props} linksOrder="byCreatedAt-desc"/></MainLayout>
            }/>
            <Route path="/top-vote" render={ props =>
              <MainLayout><Links {...props} linksOrder="byVotesCount-desc"/></MainLayout>
            }/>
            <Route path="/search" render={ props =>
              <MainLayout><Search/></MainLayout>
            }/>
            <Route path="/login" render={ props =>
              <MainLayout><Login {...props} /></MainLayout>
            }/>
          </Suspense>
        </ApolloProvider>
      </BrowserRouter>
    )
  }

}

export default App;
