import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Header from './Header';
import Footer from './Footer';

const styles = theme => ({
  layout: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },

  mainBody: {
    margin: "80px 16px 0",
    width: "100%",
    padding: theme.spacing.unit * 3,
    flex: 1,
  },
});

const MainLayout = props =>
  <div className = { props.classes.layout }>
    <Header />
    <main className = { props.classes.mainBody } >
      { props.children }
    </main>
    <Footer />
  </div>

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainLayout);
