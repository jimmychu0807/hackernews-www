// core/data components
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withApollo } from "react-apollo";

// styling components
import {
  AppBar, Toolbar, Typography, Button,
  MenuItem, Avatar, Icon, ListItemIcon, ListItemText,
  Popper, Grow, Paper, ClickAwayListener, MenuList
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';

//app components
import SubmitLink from '../SubmitLink';

// services
import UserService from '../../services/UserService';

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
      appTitle: "Hacker News",
      anchorAccountMenu: null,
      submitLinkDialogOpen: false,
    };
  }

  handleMenuOpen = ev => {
    this.setState({ anchorAccountMenu: ev.currentTarget });
  }

  handleMenuClose = ev => {
    this.setState({ anchorAccountMenu: null });
  }

  handleLogout = ev => {
    UserService.logout();
    this.props.history.push("/");
    this.handleMenuClose(ev);
  }

  openSubmitLinkDialog = ev => {
    this.setState({ submitLinkDialogOpen: true })
  }

  closeSubmitLinkDialog = ev => {
    this.setState({ submitLinkDialogOpen: false })
  }

  menuGotoUrl = siteUrl => ev => {
    this.props.history.push(siteUrl);
    this.handleMenuClose(ev);
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
      <Button onClick={ this.handleMenuOpen }>
        <span className={ classes.nameInButton }>{ `${user.name}` }</span>
        <Avatar className={ classes.avatar }>{ userFirstChar }</Avatar>
      </Button>

      <Popper open={ !!anchorAccountMenu } anchorEl={ anchorAccountMenu }
        transition disablePortal>{ ({ TransitionProps }) => (
        <Grow {...TransitionProps} id="menu-item-grow"
          style={{ transformOrigin: 'center top' }}
          ><Paper><ClickAwayListener onClickAway={ this.handleMenuClose }>
          <MenuList>

            <MenuItem onClick={ this.menuGotoUrl("/profile/edit") }>
              <ListItemIcon className={ classes.menuIcon }>
                <Icon className="far fa-fw fa-user" />
              </ListItemIcon>
              <ListItemText inset primary="Profile" />
            </MenuItem>

            <MenuItem onClick={ this.handleLogout }>
              <ListItemIcon className={ classes.menuIcon }>
                <Icon className="fas fa-fw fa-sign-out-alt" />
              </ListItemIcon>
              <ListItemText inset primary="Logout" />
            </MenuItem>

          </MenuList>
        </ClickAwayListener></Paper></Grow>
      ) }</Popper>
    </React.Fragment>)
  }

  renderAccountMenuBeforeLogIn = () => {
    const { classes } = this.props;
    return (<Link to="/login">
      <Button variant="outlined" className={ clsx(classes.menuBarText, classes.loginBtn) }>LOGIN</Button>
    </Link>)
  }

  render() {
    const { appTitle, submitLinkDialogOpen } = this.state;
    const { classes } = this.props;
    const user = UserService.currentUser();

    return(<header>
      <AppBar className={ classes.appBar }>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            <Link to="/" className={ classes.menuBarText }>{ appTitle }</Link>
          </Typography>

          <Button>
            <Link to="/top-vote" className={ classes.menuBarText }>
              Top Vote
            </Link>
          </Button>
          <Button className= { classes.menuBarText } onClick ={ this.openSubmitLinkDialog }>
            Submit
          </Button>
          { user ?
            this.renderAccountMenuLoggedIn(user) :
            this.renderAccountMenuBeforeLogIn() }
        </Toolbar>
      </AppBar>
      <SubmitLink dialogOpen={ submitLinkDialogOpen }
        handleDialogClose={ this.closeSubmitLinkDialog } />
    </header>)
  }
}

export default withApollo(withRouter(withStyles(styles)(Header)));
