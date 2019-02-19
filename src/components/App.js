import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';

import Home from "./Home"
import TopVote from "./TopVote"
import Search from "./Search"
import Login from "./Login"
import MainLayout from "./Layout/MainLayout"

import '../styles/App.css';

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
})

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <ApolloProvider client = { client }>
          <CssBaseline />
          <Route exact path="/" component={ (props) =>
            <MainLayout><Home/></MainLayout>
          }/>
          <Route path="/top-vote" component={ (props) =>
            <MainLayout><TopVote/></MainLayout>
          }/>
          <Route path="/search" component={ (props) =>
            <MainLayout><Search/></MainLayout>
          }/>
          <Route path="/login" component={ (props) =>
            <MainLayout><Login/></MainLayout>
          }/>
        </ApolloProvider>
      </BrowserRouter>
    )
  }

}

export default App;
