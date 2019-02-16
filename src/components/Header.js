import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

  render() {
    return(
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/top-vote">Top Vote</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/login">Log In</Link></li>
        </ul>
      </div>
    )
  }
}

export default Header;
