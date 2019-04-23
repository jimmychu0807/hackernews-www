// core/data components
import React, { Component } from 'react';
import { withApollo } from "react-apollo";

import CommentsPanel from './CommentsPanel';

// services
import { GET_COMMENTS_GQL, POST_COMMENT_GQL } from '../../services/gql.js';


class CommentsPanelContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: "",
    }
    // The following two objects for refetching queries after mutation
    this.getCommentsGqlObj = {
      query: GET_COMMENTS_GQL,
      variables: { commentableId: props.link.id, levelType: "top_level" },
    }
  }

  handleInputChange = name => ev => {
    this.setState({ [name]: ev.target.value });
  }

  handlePostComment = async ev => {
    ev.preventDefault();

    let { content } = this.state;
    content = content.trim();
    if (content.length === 0) return;

    const { client: apolloClient, link } = this.props;
    await apolloClient.mutate({
      mutation: POST_COMMENT_GQL,
      variables: { commentableId: link.id, content },
      refetchQueries: [ this.getCommentsGqlObj ]
    });

    this.setState({ content: "" });
  }

  render() {
    const { link, classes, commentsPanelEverOpen } = this.props;

    return(
      <CommentsPanel
        link =                  { link }
        classes =               { classes }
        commentsPanelEverOpen = { commentsPanelEverOpen }
        handleInputChange =     { this.handleInputChange }
        handlePostComment =     { this.handlePostComment }
        getCommentsGqlObj =     { this.getCommentsGqlObj }
        {...this.state}
      />
    )
  }
}

export default withApollo(CommentsPanelContainer);
