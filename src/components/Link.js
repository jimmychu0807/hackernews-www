// core/data components
import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Mutation, withApollo } from "react-apollo";

// styling components
import {
  Paper, Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
  Typography, Icon, Grid
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import clsx from 'clsx';
import { grey } from '@material-ui/core/colors';

// Our own services
import CommentsPanel from './CommentsPanel';
import { getDomainFromLink } from '../services/HelperMethods';
import { UPVOTE_GQL, CANCEL_UPVOTE_GQL } from './gql.js';

const styles = theme => ({
  one_link: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  btn_icon: {
    marginRight: theme.spacing.unit / 2,
  },
  voteBtn: {
    marginRight: theme.spacing.unit,
    '&.normal': {
      color: grey[400],
    },
    '&.upvoted': {
      color: theme.palette.primary.main,
    }
  },
  linkDesc: {
    textDecoration: "none",
    '&:hover': {
      textDecoration: "underline black",
    },
  },
  linkIcon: {
    width: theme.spacing.unit * 4,
  },
  linkDomain: {
    marginLeft: theme.spacing.unit * 2,
    color: grey[500],
    fontWeight: 500,
  },
});

class Link extends Component {

  constructor(props) {
    super(props);
    const { link } = this.props;
    this.state = {
      renderActionBtnType: (link.loginUserVoted ? "cancelUpvoteBtn" : "upvoteBtn"),
      commentsPanelEverOpen: false,
    };
  }

  handleVoting = upvoted => async ev => {
    const { client: apolloClient, link: { id: linkId } } = this.props;
    const mutation = upvoted ? CANCEL_UPVOTE_GQL : UPVOTE_GQL
    await apolloClient.mutate({ mutation, variables: { linkId }});

    // Update the internal state
    this.setState({ renderActionBtnType: upvoted ? "upvoteBtn" : "cancelUpvoteBtn" });
  }

  handleOpenPanel = ev => (this.setState({ commentsPanelEverOpen: true }))

  render() {
    const { ind, link, classes } = this.props;
    const { renderActionBtnType, commentsPanelEverOpen } = this.state;
    const upvoted = (renderActionBtnType === "cancelUpvoteBtn");
    const linkOwner = link.submitter;
    const domain = getDomainFromLink(link.url);

    return (<Paper className={ classes.one_link }>
      <Grid container spacing={8}>
        <Grid item style={{ flexGrow: 1 }}>
          <Grid container style={{ alignItems: 'baseline' }}>
            {/* Voting button */}
            <Button className={ clsx(classes.voteBtn, upvoted ? 'upvoted' : 'normal') }
              onClick={ this.handleVoting(upvoted) }>
              <i className={ clsx(classes.btn_icon, "far fa-thumbs-up fa-fw fa-lg") } />
              <Typography variant="button">{ link.votesCount }</Typography>
            </Button>
            <Grid item style={{ flexGrow: 1 }}>
              <Typography variant="body1">
                <a href={link.url} className={ classes.linkDesc }
                  target="_blank" rel="noopener noreferrer">
                  <i className={ clsx(classes.linkIcon, "fas fa-fw fa-link fa-sm") }/>
                  {link.description}
                </a>
                <span className={ classes.linkDomain }>({ domain })</span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>

        </Grid>
      </Grid>
      {/* <RouterLink to={ `/profile/${linkOwner.id}` }>{ linkOwner.name }</RouterLink> */}
      {/* <div>Submitted At: { link.createdAt }</div> */}
      {/* <ExpansionPanel> */}
      {/*   <ExpansionPanelSummary expandIcon={ <ExpandMoreIcon /> } onClick={ this.handleOpenPanel }> */}
      {/*     <Typography>Comments: { link.commentsCount }</Typography> */}
      {/*   </ExpansionPanelSummary> */}
      {/*   <ExpansionPanelDetails> */}
      {/*     <CommentsPanel link={ link } commentsPanelEverOpen={ commentsPanelEverOpen } /> */}
      {/*   </ExpansionPanelDetails> */}
      {/* </ExpansionPanel> */}
    </Paper>)
  }
}

export default withApollo(withStyles(styles)(Link));
