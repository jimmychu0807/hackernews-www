import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// styling components
import { withStyles } from '@material-ui/core/styles';
import {
  Paper, Button
} from '@material-ui/core';

// Our own services
import { getDomainFromLink } from '../services/HelperMethods';

const styles = theme => ({
  one_link: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  },
});

class Link extends Component {

  render() {
    const { ind, link, classes } = this.props;
    const linkOwner = link.user;
    const domain = getDomainFromLink(link.url);

    return (
      <Paper className = { classes.one_link }>
        <span>{ ind + 1 }.</span>
        <a href={link.url} target="_blank" rel="noopener noreferrer">{link.description}</a>
        ({ domain })
        <div>
          by&nbsp;
          <RouterLink to={ `/profile/${linkOwner.id}` }>{ linkOwner.name }</RouterLink>
        </div>
        <div>
          <span>Vote: { link.votesCount }</span>
          <Button color="primary">UPVOTE</Button>
        </div>
        <div>Submitted At: { link.createdAt }</div>
      </Paper>
    )
  }
}

export default withStyles(styles)(Link);
