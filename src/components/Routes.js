import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from "./Home"
import TopVote from "./TopVote"
import Search from "./Search"
import Login from "./Login"
import MainLayout from "./Layout/MainLayout"

class Routes extends Component {
  render() {
    return(
      <React.Fragment>
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
    )
  }

}

export default Routes;
