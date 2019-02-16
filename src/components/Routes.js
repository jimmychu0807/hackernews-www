import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from "./Home"
import TopVote from "./TopVote"
import Search from "./Search"
import Login from "./Login"

class Routes extends Component {
  render() {
    return(
      <React.Fragment>
        <Route exact path="/" component={Home}/>
        <Route path="/top-vote" component={TopVote}/>
        <Route path="/search" component={Search}/>
        <Route path="/login" component={Login}/>
      </React.Fragment>
    )
  }

}

export default Routes;
