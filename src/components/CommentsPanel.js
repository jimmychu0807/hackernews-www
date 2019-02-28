// core/data components
import React, { Component } from 'react';
import { withApollo } from "react-apollo";

// styling components
import {
  TextField, Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// services
import CommentInCommentsPanel from './CommentInCommentsPanel';
import { GET_COMMENTS_GQL, POST_COMMENT_GQL } from './gql.js';

const styles = theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  }
});

class CommentsPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: "",
      comments: [],
    }

    this.getCommentsGqlObj = {
      query: GET_COMMENTS_GQL,
      variables: { commentableId: props.link.id, levelType: "top_level" },
    }
  }

  componentDidMount() {
    this.fetchLinkComments();
  }

  fetchLinkComments = async() => {
    const { client: apolloClient } = this.props;
    // Need to load the comments of the link

    let { data: { getCommentsByCommentableId: { nodes: comments } } } =
      await apolloClient.query(this.getCommentsGqlObj);

    this.setState({ comments: comments });
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
      update: (proxy, { data: { postComment: { comment } } }) => {
        // Update apollo cache
        const cache = proxy.readQuery(this.getCommentsGqlObj);
        let comments = cache.getCommentsByCommentableId.nodes;
        comments.unshift(comment);
        proxy.writeQuery({ ...this.getCommentsGqlObj, data: cache });

        // Update component state
        this.setState({ comments: comments });
      }
    });

    this.setState({ content: "" });
  }

  render() {
    const { link, classes } = this.props;
    const { content, comments } = this.state;

    return(<div className={ classes.wrapper }>
      <TextField id={ `${link.id}-comment` } label="Comment"
        fullWidth multiline required
        rows={ 3 } rowsMax={ 5 }
        value={ content }
        onChange = { this.handleInputChange('content') }
        margin="normal" />
      <Button color="primary" onClick={ this.handlePostComment }>Submit</Button>
      { comments.map( (comment) => <CommentInCommentsPanel key= { comment.id } comment={ comment } />) }
    </div>)
  }
}

export default withStyles(styles)(withApollo(CommentsPanel));
