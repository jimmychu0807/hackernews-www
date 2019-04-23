import React from 'react';

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

const Footer = props =>
  <footer className={props.classes.footer}>
    <hr/>
    <Typography color='textSecondary' align='center' gutterBottom>
      <Translate id='footer.main'/>
      &nbsp;|&nbsp;
      <span className={props.classes.left_right_margin}>
        <i className="fab fa-github fa-lg fa-fw"/>
      </span>
      { Object.keys(URLS)
        .map(k =>
          <a href={URLS[k]} key={k} target='_blank' rel="noopener noreferrer">
            <Translate id={`footer.${k}`}/>
          </a>)
        .reduce((mem, current, ind) => [ mem, ", ", current ])
      }
    </Typography>
  </footer>

export default withStyles(styles)(Footer);

