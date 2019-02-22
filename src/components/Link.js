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
        <a href={link.url} target="_blank" rel="noopener noreferrer">{link.description}</a>
        <div>by { linkOwner.name }</div>
        <div>Vote: { link.votesCount }</div>
        <div>Submitted At: { link.createdAt }</div>
      </div>
    )
  }
}

export default Link;
