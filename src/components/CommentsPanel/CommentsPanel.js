// core/data components
import React from 'react';
import { Query } from "react-apollo";

// styling components
import {
  TextField, Button, Divider
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CommentInCommentsPanel from '../CommentInCommentsPanel';

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

const CommentsPanel = props => {
  const { link, classes, commentsPanelEverOpen, content } = props;
  return(
    <div className={ classes.wrapper }>
      <TextField id={ `${link.id}-comment` } label="Comment"
        fullWidth multiline required
        rows={3} rowsMax={3}
        value={ content }
        onChange = { props.handleInputChange('content') }
        margin="normal" />

      <Button color="primary" onClick={ props.handlePostComment }>Submit</Button>

      { commentsPanelEverOpen && (<Query { ...props.getCommentsGqlObj }>
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
    </div>
  )
};

export default withStyles(styles)(CommentsPanel);
