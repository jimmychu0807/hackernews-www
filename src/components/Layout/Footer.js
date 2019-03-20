import React, { Component } from 'react';

// Styling
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Multilingual Support
import { Translate } from 'react-localize-redux';

const styles = theme => ({
  footer: {
    width: "100%",
    padding: `${theme.spacing.unit}px ${theme.spacing.unit*2}px ${theme.spacing.unit}px`,
    marginTop: theme.spacing.unit,
  },
  emoji: {
    margin: `0 ${theme.spacing.unit}px`,
  },
  emphasis: {
    textDecoration: "none",
    fontWeight: "bold",
  },
  left_right_margin: {
    marginLeft:  theme.spacing.unit,
    marginRight:  theme.spacing.unit,
  }
});

class Footer extends Component {

  render() {
    let { classes } = this.props;

    return(
      <footer className={ classes.footer }>
        <hr/>
        <Typography color="textSecondary" align="center" gutterBottom>
          <Translate id="footer.main" />
          &nbsp;|&nbsp;
          <span className={ classes.left_right_margin }>
            <i className="fab fa-github fa-lg fa-fw" />
          </span>
          <a href="https://github.com/jimmychu0807/hackernews-www"
            target="_blank" rel="noopener noreferrer">
            <Translate id="footer.frontend" /></a>
          ,&nbsp;
          <a href="https://github.com/jimmychu0807/hackernews-api"
            target="_blank" rel="noopener noreferrer">
            <Translate id="footer.backend" /></a>
        </Typography>
      </footer>
    )
  }

}

export default withStyles(styles)(Footer);

