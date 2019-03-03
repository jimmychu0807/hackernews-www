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
})

function UserProfileLink(props) {
  const { user, classes } = props;

  return(
    <Typography inline component="span" variant="subtitle1">
      <Link className={ classes.userLink } to={ `/profile/${user.id}`}>
        { user.name }
      </Link>
    </Typography>
    )
}

export default withStyles(styles)(UserProfileLink);
