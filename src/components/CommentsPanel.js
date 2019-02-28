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
import { GET_COMMENTS_GQL } from './gql.js';

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
  }

  async componentDidMount() {
    const { client: apolloClient, link } = this.props;
    // Need to load the comments of the link

    let { data: { getCommentsByCommentableId: { nodes: comments } } } =
      await apolloClient.query({ query: GET_COMMENTS_GQL,
        variables: { commentableId: link.id, levelType: "top_level" } });

    this.setState({ comments: comments });
  }

  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value });
  }

  render() {
    const { link, classes } = this.props;
    const { content, comments } = this.state;

    return(<div className={ classes.wrapper }>
      <TextField id={ `${link.id}-comment` } label="Comment"
        fullWidth multiline required
        rows={ 3 } rowsMax={ 5 }
        value={ content }
        onChange = { this.handleChange('content') }
        margin="normal" />
      <Button color="primary">Submit</Button>
      { comments.map( (comment) => <CommentInCommentsPanel key= { comment.id } comment={ comment } />) }
    </div>)
  }
}

export default withStyles(styles)(withApollo(CommentsPanel));
