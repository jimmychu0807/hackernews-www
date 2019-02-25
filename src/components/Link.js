import React, { Component } from 'react';

// Styling
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';


const styles = theme => ({
  one_link: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  },
});

class Link extends Component {

  getDomain = (linkUrl) => {
    return linkUrl;
  }

  render() {
    const { ind, link, classes } = this.props
    const linkOwner = link.user
    return (
      <Paper className = { classes.one_link }>
        <span>{ind + 1}.</span>
        <a href={link.url} target="_blank" rel="noopener noreferrer">{link.description}</a>
        <div>by { linkOwner.name }</div>
        <div>Vote: { link.votesCount }</div>
        <div>Submitted At: { link.createdAt }</div>
      </Paper>
    )
  }
}

export default withStyles(styles)(Link);
