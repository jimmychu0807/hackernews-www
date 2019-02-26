import React from 'react';

import { loadCSS } from 'fg-loadcss/src/loadCSS';

class UseFontAwesome extends React.Component {
  componentDidMount() {
    loadCSS("https://use.fontawesome.com/releases/v5.7.2/css/all.css",
      document.querySelector("#insertion-point-jss"));
  }

  render() {
    return(<React.Fragment />)
  }
}

export default UseFontAwesome
