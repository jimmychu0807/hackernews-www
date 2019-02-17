import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Header from '../Header';
import Footer from '../Footer';

const styles = theme => ({
  header: {

  },
  mainBody: {
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
        <Grid container className={classes.mainBody} spacing={16}>
          { this.props.children }
        </Grid>
        <Footer className={ classes.footer } />
      </React.Fragment>
    )
  }
};

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainLayout);
