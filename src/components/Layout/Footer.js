import React, { Component } from 'react';

// Styling
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  footer: {
    width: "100%",
    padding: `${theme.spacing.unit}px ${theme.spacing.unit*2}px ${theme.spacing.unit}px`,
    marginTop: theme.spacing.unit * 3,
  },
});

class Footer extends Component {

  render() {
    let { classes } = this.props;

    return(
      <div className={ classes.footer }>
        <hr/>
        <Typography color="textSecondary" align="center" gutterBottom>
          Built by <a href="https://www.hkwtf.com">WTF Studio</a>
        </Typography>
      </div>
    )
  }

}

export default withStyles(styles)(Footer);

