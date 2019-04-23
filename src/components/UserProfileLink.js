// core/data components
import React from 'react';
import { Link } from 'react-router-dom';

// Styling components
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  userLink: {
    textDecoration: "none",
  }
});

const UserProfileLink = props =>
  <Typography inline component="span" variant="subtitle1">
    <Link className={props.classes.userLink}
      to={`/profile/${props.user.id}`}>
      {props.user.name}
    </Link>
  </Typography>

export default withStyles(styles)(UserProfileLink);
