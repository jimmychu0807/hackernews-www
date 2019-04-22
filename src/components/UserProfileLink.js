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

const UserProfileLink = props => pug`
  - const { user, classes } = props;
  Typography(inline component="span" variant="subtitle1")
    Link(className=classes.userLink to=("/profile/" + user.id))= user.name
`;

export default withStyles(styles)(UserProfileLink);
