// core/data components
import React, { Component } from 'react';

class CommentInCommentsPanel extends Component {

  render() {
    const { comment } = this.props;
    return (<div>
      { comment.content }
    </div>)
  }
}

export default CommentInCommentsPanel;
