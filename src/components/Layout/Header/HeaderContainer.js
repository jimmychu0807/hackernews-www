// core/data components
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withApollo } from "react-apollo";

// redux and actions
import { compose } from 'redux';
import { connect } from "react-redux";

//app components
import Header from './Header';

//Multilingual Support
import { withLocalize, getActiveLanguage, getLanguages } from 'react-localize-redux';

// services
import UserService from '../../../services/UserService';

class HeaderContainer extends Component {
  state = {
    anchorAccountMenu: null,
    anchorLangsMenu: null,
    submitLinkDialogOpen: false,
  };

  handleMenuOpen = type => ev => {
    this.setState({ [type]: ev.currentTarget });
  }

  handleMenuClose = type => ev => {
    this.setState({ [type]: null });
  }

  handleLogout = ev => {
    this.handleMenuClose("anchorAccountMenu")(ev);

    UserService.logout();
    this.props.history.push("/");
  }

  handleChangeLanguage = langCode => ev => {
    this.handleMenuClose("anchorLangsMenu")(ev);

    const { setActiveLanguage } = this.props;
    setActiveLanguage(langCode);
  }

  openSubmitLinkDialog = ev => {
    this.setState({ submitLinkDialogOpen: true })
  }

  closeSubmitLinkDialog = ev => {
    this.setState({ submitLinkDialogOpen: false })
  }

  menuGotoUrl = siteUrl => ev => {
    this.handleMenuClose("anchorAccountMenu")(ev);
    this.props.history.push(siteUrl);
  }

  render() {
    return(
      <Header
        user =                  { UserService.currentUser() }
        handleMenuOpen =        { this.handleMenuOpen }
        handleMenuClose =       { this.handleMenuClose }
        handleLogout =          { this.handleLogout }
        menuGotoUrl =           { this.menuGotoUrl }
        handleChangeLanguage =  { this.handleChangeLanguage }
        closeSubmitLinkDialog = { this.closeSubmitLinkDialog }
        { ...this.state }
      />
    );
  }
}

const mapStateToProps = state => ({
  currentLanguage: getActiveLanguage(state.localize).code,
  languages: getLanguages(state.localize),
});

export default compose(
  connect(mapStateToProps), withApollo, withLocalize, withRouter
)(HeaderContainer);
