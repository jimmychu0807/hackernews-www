// core/data components
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withApollo } from "react-apollo";

// styling components
import { AppBar, Toolbar, IconButton, Typography, Button, InputBase,
  Menu, MenuItem
} from '@material-ui/core';
import { Search as SearchIcon, AccountCircle } from '@material-ui/icons';
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
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
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
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
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

  handleMenuClose = ev => {
    this.setState({ anchorAccountMenu: null });
  }

  handleLogout = ev => {
    this.handleMenuClose(ev);
    UserService.logout();
    this.props.history.push("/");
  }

  openSubmitLinkDialog = ev => {
    this.setState({ submitLinkDialogOpen: true })
  }

  closeSubmitLinkDialog = ev => {
    this.setState({ submitLinkDialogOpen: false })
  }

  renderSearch = () => {
    const { classes } = this.props;
    return(
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </div>
    )
  }

  renderAccountMenuLoggedIn = (user) => {
    let { anchorAccountMenu } = this.state;
    return (<React.Fragment>
      {`${user.name}`}
      <IconButton
        aria-owns={ !!anchorAccountMenu ? 'menu-appbar' : null }
        aria-haspopup="true" color="inherit"
        onClick={ (ev) => this.setState({ anchorAccountMenu: ev.currentTarget }) }>
        <AccountCircle/>
      </IconButton>
      <Menu
        id="user-menu" anchorEl={ anchorAccountMenu }
        open={ !!anchorAccountMenu } onClose={ this.handleMenuClose }>
        <MenuItem onClick={ this.handleMenuClose }>Profile</MenuItem>
        <MenuItem onClick={ this.handleLogout }>Logout</MenuItem>
      </Menu>
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
          { this.renderSearch() }
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
