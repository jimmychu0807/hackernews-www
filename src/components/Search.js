import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';

class Search extends Component {

  render() {
    return(
      <React.Fragment>
        <Header/>
        <div>Search</div>
        <Footer/>
      </React.Fragment>
    )
  }

}

export default Search;
