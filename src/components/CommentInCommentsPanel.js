// core/data components
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CommentInCommentsPanel extends Component {

  render() {
    const { comment } = this.props;
    const { user: commentUser } = comment;

    return (<div>
      <span>{ comment.content }</span>
      <div>
        <Link to={ `/profile/${commentUser.id}` }>{ commentUser.name }</Link>
      </div>
      <div>{ comment.createdAt }</div>
    </div>)
  }
}

export default CommentInCommentsPanel;
