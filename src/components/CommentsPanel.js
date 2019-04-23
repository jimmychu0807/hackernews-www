// core/data components
import React, { Component } from 'react';
import { withApollo, Query } from "react-apollo";

// styling components
import {
  TextField, Button, Divider
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// services
import { GET_COMMENTS_GQL, POST_COMMENT_GQL } from '../services/gql.js';
import CommentInCommentsPanel from './CommentInCommentsPanel';

const styles = theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  withMargin: {
    ...theme.mixins.gutters(),
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  }
});

class CommentsPanel extends Component {

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
    const { content } = this.state;

    return(<div className={ classes.wrapper }>
      <TextField id={ `${link.id}-comment` } label="Comment"
        fullWidth multiline required
        rows={3} rowsMax={3}
        value={ content }
        onChange = { this.handleInputChange('content') }
        margin="normal" />

      <Button color="primary" onClick={ this.handlePostComment }>Submit</Button>

      { commentsPanelEverOpen && (<Query { ...this.getCommentsGqlObj }>
        { ({ loading, error, data }) => {
          if (loading) return (<div>Fetching...</div>)

          const { getCommentsByCommentableId: { nodes: comments } } = data
          return(<div>{
            comments.length > 0 && comments
              .map(comment => <CommentInCommentsPanel key={ comment.id } comment={ comment } />)
              .reduce((mem, current, i) => [ mem, <Divider key={i} className={ classes.withMargin } />, current ])
          }</div>)
        } }
      </Query>) }
    </div>)
  }
}

export default withStyles(styles)(withApollo(CommentsPanel));
