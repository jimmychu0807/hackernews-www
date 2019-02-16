import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';

class TopVote extends Component {

  render() {
    return(
      <React.Fragment>
        <Header/>
        <div>TopVote</div>
        <Footer/>
      </React.Fragment>
    )
  }

}

export default TopVote;
