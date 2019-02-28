// core/data components
import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Mutation } from "react-apollo";

// styling components
import { withStyles } from '@material-ui/core/styles';
import {
  Paper, Button
} from '@material-ui/core';

// Our own services
import { getDomainFromLink } from '../services/HelperMethods';
import { UPVOTE_GQL, CANCEL_UPVOTE_GQL } from './gql.js';

const styles = theme => ({
  one_link: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  },
});

class Link extends Component {

  constructor(props) {
    super(props);
    const { link } = this.props;
    this.state = {
      renderActionBtnType: (link.loginUserVoted ? "cancelUpvoteBtn" : "upvoteBtn")
    };
  }

  handleVotingBtn = (gqlFunc, type) => async ev => {
    await gqlFunc();

    const targetStates = {
      upvote: "cancelUpvoteBtn",
      cancelUpvote: "upvoteBtn",
    }

    // Using object literal to replace switch-case stmt
    let targetState = targetStates[type];
    if (!targetState) return new Error(`Unknown type: ${type}`);
    this.setState({ renderActionBtnType: targetState });
  }

  renderCancelUpvoteBtn = link => {
    // TODO: Handle when user has not logged in
    return(
      <Mutation mutation={ CANCEL_UPVOTE_GQL } variables={ { linkId: link.id } }
        >{ (gqlFunc, { loading, error}) =>(
        <Button color="primary" onClick={ this.handleVotingBtn(gqlFunc, "cancelUpvote") }
          disabled={ loading }>CANCEL UPVOTE</Button>
      ) }</Mutation>
    )
  }

  renderUpvoteBtn = link => {
    // TODO: Handle when user has not logged in
    return(
      <Mutation mutation={ UPVOTE_GQL } variables={ { linkId: link.id } }
        >{ (gqlFunc, { loading, error}) =>(
        <Button color="primary" onClick={ this.handleVotingBtn(gqlFunc, "upvote") }
          disabled={ loading }>UPVOTE</Button>
      ) }</Mutation>
    )
  }

  render() {
    const { ind, link, classes } = this.props;
    const { renderActionBtnType } = this.state;
    const linkOwner = link.submitter;
    const domain = getDomainFromLink(link.url);

    return (<Paper className = { classes.one_link }>
      <span>{ ind + 1 }.</span>
      <a href={link.url} target="_blank" rel="noopener noreferrer">{link.description}</a>
      ({ domain })
      <div>
        by&nbsp;
        <RouterLink to={ `/profile/${linkOwner.id}` }>{ linkOwner.name }</RouterLink>
      </div>
      <div>
        <span>Vote: { link.votesCount }</span>
        { renderActionBtnType === "cancelUpvoteBtn" ?
          this.renderCancelUpvoteBtn(link) :
          this.renderUpvoteBtn(link) }
      </div>
      <div>Submitted At: { link.createdAt }</div>
    </Paper>)
  }
}

export default withStyles(styles)(Link);
