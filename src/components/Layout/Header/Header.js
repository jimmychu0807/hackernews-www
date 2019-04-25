// core/data components
import React from 'react';
import { Link } from 'react-router-dom';

// redux-helper
import { compose } from 'redux';

// styling components
import {
  AppBar, Toolbar, Typography, Button, IconButton, Menu,
  MenuItem, Avatar, Icon, ListItemIcon, ListItemText,
  Popper, Grow, Paper, ClickAwayListener, MenuList
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { Language as LanguageIcon } from '@material-ui/icons';
import clsx from 'clsx';

//Multilingual Support
import { Translate } from 'react-localize-redux';

// app components
import SubmitLink from '../../SubmitLink';

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

const AccountMenuLoggedIn = props => {
  const { classes, user, anchorAccountMenu, handleMenuOpen,
    handleMenuClose, handleLogout, menuGotoUrl } = props;
  const userFirstChar = user.name.charAt(0).toUpperCase();
  return(
    <React.Fragment>
      <Button onClick={ handleMenuOpen("anchorAccountMenu") }>
        <span className={ classes.nameInButton }>{ `${user.name}` }</span>
        <Avatar className={ classes.avatar }>{ userFirstChar }</Avatar>
      </Button>

      <Popper open={ !!anchorAccountMenu } anchorEl={ anchorAccountMenu }
        transition disablePortal>{ ({ TransitionProps }) => (
        <Grow {...TransitionProps} id="menu-item-grow"
          style={{ transformOrigin: 'center top' }}>
          <Paper>
            <ClickAwayListener onClickAway={ handleMenuClose("anchorAccountMenu") }>
              <MenuList>

                <MenuItem onClick={ menuGotoUrl("/profile/edit") }>
                  <ListItemIcon className={ classes.menuIcon }>
                    <Icon className="far fa-fw fa-user" />
                  </ListItemIcon>
                  <ListItemText inset primary={ <Translate id="header.profile" /> } />
                </MenuItem>

                <MenuItem onClick={ handleLogout }>
                  <ListItemIcon className={ classes.menuIcon }>
                    <Icon className="fas fa-fw fa-sign-out-alt" />
                  </ListItemIcon>
                  <ListItemText inset primary={ <Translate id="header.logout" /> } />
                </MenuItem>

              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
        )}</Popper>
    </React.Fragment>
  )
}

const AccountMenuBeforeLogIn = props => {
  const { classes } = props;
  return(
    <Link to="/login">
      <Button variant="outlined"
        className={ clsx(classes.menuBarText, classes.loginBtn) }>
        <Translate id="header.login" />
      </Button>
    </Link>
  );
}

const LanguagesMenu = props => {
  const { classes, languages, anchorLangsMenu, handleChangeLanguage,
    handleMenuOpen, handleMenuClose } = props;
  return(
    <React.Fragment>
      <IconButton onClick={ handleMenuOpen("anchorLangsMenu") }
        className={ classes.menuBarText }>
        <LanguageIcon />
      </IconButton>

      <Menu id="langs-menu" anchorEl={ anchorLangsMenu } disableAutoFocusItem
        open={ !!anchorLangsMenu } onClose={ handleMenuClose("anchorLangsMenu") }
        getContentAnchorEl={null}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }} >
        { languages.map(lang => (
          <MenuItem key={lang.code} onClick={ handleChangeLanguage(lang.code) }>
            <Translate id={`header.lang.${lang.code}`}/>
          </MenuItem>
        )) }
      </Menu>

    </React.Fragment>
  );
}

const Header = props => {
  const { classes } = props;
  return(
    <header>
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
          <Button className={ classes.menuBarText } onClick ={ props.openSubmitLinkDialog }>
            <Translate id="header.submit" />
          </Button>
          { props.user ? <AccountMenuLoggedIn {...props} /> : <AccountMenuBeforeLogIn {...props} /> }
          <LanguagesMenu {...props} />
        </Toolbar>
      </AppBar>
      <SubmitLink
        dialogOpen={ props.submitLinkDialogOpen }
        handleDialogClose={ props.closeSubmitLinkDialog } />
    </header>
  );
}

export default compose(
  withStyles(styles)
)(Header);
