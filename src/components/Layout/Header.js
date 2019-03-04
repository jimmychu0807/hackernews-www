// core/data components
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withApollo } from "react-apollo";

// styling components
import {
  AppBar, Toolbar, Typography, Button, IconButton, Menu,
  MenuItem, Avatar, Icon, ListItemIcon, ListItemText,
  Popper, Grow, Paper, ClickAwayListener, MenuList
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Language as LanguageIcon } from '@material-ui/icons';

import { fade } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';

//Multilingual Support
import { withLocalize, Translate } from 'react-localize-redux';

//app components
import SubmitLink from '../SubmitLink';

// services
import UserService from '../../services/UserService';
import LanguageService from '../../services/LanguageService';

const styles = theme => ({
  appBar: {
    position: "fixed",
  },
  button: {
    margin: theme.spacing.unit,
  },
  title: {
    flex: 1,
  },
  menuBarText: {
    color: theme.palette.common.white,
    textDecoration: 'none'
  },
  loginBtn: {
    border: `1px solid rgba(255, 255, 255, 0.7)`
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  nameInButton: {
    marginRight: theme.spacing.unit,
    color: "white",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  menuIcon: {
    marginRight: 0,
  },
});

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorAccountMenu: null,
      anchorLangsMenu: null,
      submitLinkDialogOpen: false,
    };
  }

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

    // Also save it in localStorage
    LanguageService.setActiveLanguage(langCode);
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

  // renderSearch = () => {
  //   const { classes } = this.props;
  //   return(
  //     <div className={classes.search}>
  //       <div className={classes.searchIcon}>
  //         <Icon className="fas fa-fw fa-search" />
  //       </div>
  //       <InputBase
  //         placeholder="Search…"
  //         classes={{
  //           root: classes.inputRoot,
  //           input: classes.inputInput,
  //         }}
  //       />
  //     </div>
  //   )
  // }

  renderAccountMenuLoggedIn = (user) => {
    let { classes } = this.props;
    let { anchorAccountMenu } = this.state;
    let userFirstChar = user.name.charAt(0).toUpperCase();

    return (<React.Fragment>
      <Button onClick={ this.handleMenuOpen("anchorAccountMenu") }>
        <span className={ classes.nameInButton }>{ `${user.name}` }</span>
        <Avatar className={ classes.avatar }>{ userFirstChar }</Avatar>
      </Button>

      <Popper open={ !!anchorAccountMenu } anchorEl={ anchorAccountMenu }
        transition disablePortal>{ ({ TransitionProps }) => (
        <Grow {...TransitionProps} id="menu-item-grow"
          style={{ transformOrigin: 'center top' }}
          ><Paper><ClickAwayListener onClickAway={ this.handleMenuClose("anchorAccountMenu") }>
          <MenuList>

            <MenuItem onClick={ this.menuGotoUrl("/profile/edit") }>
              <ListItemIcon className={ classes.menuIcon }>
                <Icon className="far fa-fw fa-user" />
              </ListItemIcon>
              <ListItemText inset primary={ <Translate id="header.profile" /> } />
            </MenuItem>

            <MenuItem onClick={ this.handleLogout }>
              <ListItemIcon className={ classes.menuIcon }>
                <Icon className="fas fa-fw fa-sign-out-alt" />
              </ListItemIcon>
              <ListItemText inset primary={ <Translate id="header.logout" /> } />
            </MenuItem>

          </MenuList>
        </ClickAwayListener></Paper></Grow>
      ) }</Popper>
    </React.Fragment>)
  }

  renderAccountMenuBeforeLogIn = () => {
    const { classes } = this.props;
    return (<Link to="/login">
      <Button variant="outlined" className={ clsx(classes.menuBarText, classes.loginBtn) }>
        <Translate id="header.login" />
      </Button>
    </Link>)
  }

  renderLanguagesMenu = () => {
    const { classes, languages } = this.props;
    const { anchorLangsMenu } = this.state;

    return (<React.Fragment>
      <IconButton onClick={ this.handleMenuOpen("anchorLangsMenu") } className={ classes.menuBarText }>
        <LanguageIcon />
      </IconButton>

      <Menu id="langs-menu" anchorEl={ anchorLangsMenu } disableAutoFocusItem
        open={ !!anchorLangsMenu } onClose={ this.handleMenuClose("anchorLangsMenu") }
        getContentAnchorEl={null}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }} >
        { languages.map(lang => (
          <MenuItem key={lang.code} onClick={ this.handleChangeLanguage(lang.code) }>
            <Translate id={`header.lang.${lang.code}`}/>
          </MenuItem>
        )) }
      </Menu>

    </React.Fragment>)
  }

  render() {
    const { submitLinkDialogOpen } = this.state;
    const { classes } = this.props;
    const user = UserService.currentUser();

    return(<header>
      <AppBar className={ classes.appBar }>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            <Link to="/" className={ classes.menuBarText }>
              <Translate id="misc.appTitle" />
            </Link>
          </Typography>

          <Button>
            <Link to="/top-vote" className={ classes.menuBarText }>
              <Translate id="header.topVote" />
            </Link>
          </Button>

          <Button className={ classes.menuBarText } onClick ={ this.openSubmitLinkDialog }>
            <Translate id="header.submit" />
          </Button>

          { user ? this.renderAccountMenuLoggedIn(user) :
            this.renderAccountMenuBeforeLogIn() }

          { this.renderLanguagesMenu() }
        </Toolbar>
      </AppBar>
      <SubmitLink dialogOpen={ submitLinkDialogOpen }
        handleDialogClose={ this.closeSubmitLinkDialog } />
    </header>)
  }
}

export default withLocalize(withApollo(withRouter(withStyles(styles)(Header))));
