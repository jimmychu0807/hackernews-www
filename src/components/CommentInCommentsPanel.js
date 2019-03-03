// core/data components
import React, { Component } from 'react';

// Styling components
import {
  Typography, Grid
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Our own services
import UserProfileLink from './UserProfileLink';
import { timeDiff } from '../services/HelperMethods';

// --- Main compoent ---

const styles = theme => ({
  linkMinor: {
    fontSize: "85%",
  },
  commentPosted: {
    marginLeft: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },
})

class CommentInCommentsPanel extends Component {

  render() {
    const { comment, classes } = this.props;
    const { user: commentUser } = comment;

    return (<Grid container direction="column">
      <Grid item style={{ flexGrow: 1 }}>
        <Typography variant="body1" gutterBottom>{ comment.content }</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" className={ classes.linkMinor } style={{ flexGrow: 1 }}>
          <UserProfileLink user={ commentUser } />
          <span className={ classes.commentPosted }>{ timeDiff(comment.createdAt) }</span>
        </Typography>
      </Grid>
    </Grid>)
  }
}

export default withStyles(styles)(CommentInCommentsPanel);
