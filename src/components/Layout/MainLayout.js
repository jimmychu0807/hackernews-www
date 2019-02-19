import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import Header from '../Header';
import Footer from '../Footer';

const styles = theme => ({
  header: {

  },
  mainBody: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 3,
    flexGrow: 1,
  },
  footer: {

  },
});

class MainLayout extends Component {
  state = { };

  render() {
    const { classes } = this.props;

    return(
      <React.Fragment>
        <Header className={ classes.header } />
        <Paper className = { classes.mainBody } >
          { this.props.children }
        </Paper>
        <Footer className={ classes.footer } />
      </React.Fragment>
    )
  }
};

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainLayout);
