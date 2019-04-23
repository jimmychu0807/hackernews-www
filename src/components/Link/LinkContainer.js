// core/data components
import React, { Component } from 'react';
import { withApollo } from "react-apollo";

import Link from './Link';

// Our own services
import { UPVOTE_GQL, CANCEL_UPVOTE_GQL } from '../../services/gql.js';

class LinkContainer extends Component {

  constructor(props) {
    super(props);
    const { link } = this.props;
    this.state = {
      renderActionBtnType: (link.loginUserVoted ? "cancelUpvoteBtn" : "upvoteBtn"),
      commentsPanelEverOpen: false,
      commentsExpanded: false,
    };
  }

  handleVoting = upvoted => async ev => {
    const { client: apolloClient, link: { id: linkId } } = this.props;
    const mutation = upvoted ? CANCEL_UPVOTE_GQL : UPVOTE_GQL
    await apolloClient.mutate({ mutation, variables: { linkId }});

    // Update the internal state
    this.setState({ renderActionBtnType: upvoted ? "upvoteBtn" : "cancelUpvoteBtn" });
  }

  handleToggleCommentPanel = ev => {
    let { commentsExpanded } = this.state;
    commentsExpanded = !commentsExpanded;
    this.setState({ commentsExpanded, commentsPanelEverOpen: true });
  }

  render() {
    const { ind, link } = this.props;
    return (
      <Link {...this.state} ind={ind} link={link}
        handleVoting={this.handleVoting}
        handleToggleCommentPanel={this.handleToggleCommentPanel}
      />
    )
  }
}

export default withApollo(LinkContainer);
