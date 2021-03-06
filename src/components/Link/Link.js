import React from 'react';

// Styling components
import {
  Paper, Button, ExpansionPanel, ExpansionPanelDetails, Typography, Grid
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { grey } from '@material-ui/core/colors';

// Our own services
import { getDomainFromLink, timeDiff } from '../../services/HelperMethods';
import CommentsPanel from '../CommentsPanel';
import UserProfileLink from '../UserProfileLink';

const styles = theme => ({
  one_link: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  linkContainer: {
    alignItems: "baseline",
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
  linkIndex: {
    marginRight: theme.spacing.unit,
    color: theme.palette.text.secondary,
  },
  linkMinor:{
    fontSize: "85%",
  },
  linkPosted: {
    marginLeft: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },
});

const Link = props => {
  const { ind, link, classes, renderActionBtnType, commentsPanelEverOpen,
    commentsExpanded } = props;
  const upvoted = (renderActionBtnType === "cancelUpvoteBtn");
  const linkOwner = link.submitter;
  const domain = getDomainFromLink(link.url);

  return(
    <Paper className={ classes.one_link }>
      <Grid container spacing={8} className={ classes.linkContainer }>
        <Grid item>
          {/* Voting button */}
          <Button className={ clsx(classes.voteBtn, upvoted ? 'upvoted' : 'normal') }
            onClick={ props.handleVoting(upvoted) }>
            <i className={ clsx(classes.btn_icon, "far fa-thumbs-up fa-fw fa-lg") } />
            <Typography variant="button">{ link.votesCount }</Typography>
          </Button>
        </Grid>

        <Grid item style={{ flexGrow: 1 }}>
          {/* Link & submitter info */}
          <Grid container direction="column">
            <Grid item>
              {/* Link */}
              <Typography variant="body1" gutterBottom>
                <a href={link.url} className={ classes.linkDesc }
                  target="_blank" rel="noopener noreferrer">
                  <i className={ clsx(classes.linkIcon, "fas fa-fw fa-link fa-sm") }/>
                  {link.description}
                </a>
                <span className={ classes.linkDomain }>({ domain })</span>
              </Typography>
            </Grid>

            <Grid item>
              {/* Submitter info */}
              <Typography variant="body1" className={ classes.linkMinor }>
                <span className={classes.linkIndex}>#{ind + 1}</span>
                <UserProfileLink user={ linkOwner } />
                <span className={ classes.linkPosted }>{ timeDiff(link.createdAt) }</span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          {/* Comment button */}
          <Button color="secondary" onClick={ props.handleToggleCommentPanel }>
            <i className={ clsx(classes.btn_icon, "far fa-comments fa-fw fa-lg") } />
            <Typography variant="button" color="secondary">{ link.commentsCount }</Typography>
          </Button>
        </Grid>

      </Grid>

      <ExpansionPanel expanded={ commentsExpanded } style={{ display: commentsExpanded ? "block" : "none" }}>
        <ExpansionPanelDetails>
          <CommentsPanel link={ link } commentsPanelEverOpen={ commentsPanelEverOpen } />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper>
  );
}

export default withStyles(styles)(Link)
