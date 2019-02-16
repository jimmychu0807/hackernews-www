import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';

class Login extends Component {

  render() {
    return(
      <React.Fragment>
        <Header/>
        <div>Login</div>
        <Footer/>
      </React.Fragment>
    )
  }

}

export default Login;
