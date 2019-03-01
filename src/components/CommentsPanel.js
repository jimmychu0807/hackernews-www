// core/data components
import React, { Component } from 'react';
import { withApollo, Query } from "react-apollo";

// styling components
import {
  TextField, Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// services
import { GET_COMMENTS_GQL, POST_COMMENT_GQL, LINKS_QUERY_GQL } from './gql.js';
import CommentInCommentsPanel from './CommentInCommentsPanel';
import { getQueryVarsFromParam } from '../services/HelperMethods';
import { defaultLinksOrder } from '../services/Routing';


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
    }
    // The following two objects for refetching queries after mutation
    this.getCommentsGqlObj = {
      query: GET_COMMENTS_GQL,
      variables: { commentableId: props.link.id, levelType: "top_level" },
    }
    this.linksQueryGqlObj = {
      query: LINKS_QUERY_GQL,
      variables: getQueryVarsFromParam(defaultLinksOrder),
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
      refetchQueries: [ this.getCommentsGqlObj, this.linksQueryGqlObj ]
    });

    this.setState({ content: "" });
  }

  render() {
    const { link, classes, commentsPanelEverOpen } = this.props;
    const { content } = this.state;

    return(<div className={ classes.wrapper }>
      <TextField id={ `${link.id}-comment` } label="Comment"
        fullWidth multiline required
        rows={ 3 } rowsMax={ 5 }
        value={ content }
        onChange = { this.handleInputChange('content') }
        margin="normal" />

      <Button color="primary" onClick={ this.handlePostComment }>Submit</Button>

      { commentsPanelEverOpen && (<Query { ...this.getCommentsGqlObj }>
        { ({ loading, error, data }) => {
          if (loading) return (<div>Fetching...</div>)

          const { getCommentsByCommentableId: { nodes: comments } } = data
          return(<div>{
            comments.map( (comment) =>
              <CommentInCommentsPanel key= { comment.id } comment={ comment } />)
          }</div>)
        } }
      </Query>) }
    </div>)
  }
}

export default withStyles(styles)(withApollo(CommentsPanel));
