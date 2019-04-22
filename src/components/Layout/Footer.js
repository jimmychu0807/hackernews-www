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

const URLS = {
  frontend: "https://github.com/jimmychu0807/hackernews-www",
  backend:  "https://github.com/jimmychu0807/hackernews-api",
};

const Footer = props => pug`
  - let { classes } = props;
  footer(className=classes.footer)
    hr
    Typography(color='textSecondary' align='center' gutterBottom)
      Translate(id='footer.main')
      | &nbsp;|&nbsp;
      span(className=classes.left_right_margin): i.fab.fa-github.fa-lg.fa-fw
      each key, ind in Object.keys(URLS)
        a(href=URLS[key] key=key target="_blank" rel="noopener noreferrer")
          Translate(id=("footer." + key))
        if ind !== Object.keys(URL).length - 1
          = ", "
`;

export default withStyles(styles)(Footer);

