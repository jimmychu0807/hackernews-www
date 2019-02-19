import React, { Component } from 'react';

class Link extends Component {

  getDomain = (linkUrl) => {
    return linkUrl;
  }

  render() {
    const { ind, link } = this.props
    const linkOwner = link.user
    return (
      <div>
        <span>{ind}.</span>
        <a href={link.url} target="_blank">{link.description}</a>
        <span>{ this.getDomain(link.url) }</span>
        <div>
          by { linkOwner.name }
        </div>
      </div>
    )
  }
}

export default Link;
