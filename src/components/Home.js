import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';

class Home extends Component {

  render() {
    return(
      <React.Fragment>
        <Header/>
        <div>Home</div>
        <Footer/>
      </React.Fragment>
    )
  }

}

export default Home;
