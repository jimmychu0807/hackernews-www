import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Header from '../Header';
import Footer from '../Footer';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class MainLayout extends Component {
  state = { };

  render() {
    const { classes } = this.props;

    return(
      <React.Fragment>
        <Header/>
        <Grid container className={classes.root} spacing={16}>
          { this.props.children }
        </Grid>
        <Footer/>
      </React.Fragment>
    )
  }
};

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainLayout);
