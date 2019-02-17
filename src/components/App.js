import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Home from "./Home"
import TopVote from "./TopVote"
import Search from "./Search"
import Login from "./Login"
import MainLayout from "./Layout/MainLayout"

import '../styles/App.css';

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <React.Fragment>
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
        </React.Fragment>
      </BrowserRouter>
    )
  }

}

export default App;
