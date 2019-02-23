// core/data components
import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withApollo } from "react-apollo";

// styling components
import { AppBar, Toolbar, IconButton, Typography, Button, InputBase,
  Menu, MenuItem
} from '@material-ui/core';
import { Search as SearchIcon, AccountCircle } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  grow: {
    flexGrow: 1,
  },
  menuBarText: {
    color: theme.palette.common.white,
    textDecoration: 'none'
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
    };
  }

  handleMenuClose = ev => {
    this.setState({ anchorAccountMenu: null });
  }

  handleLogout = ev => {
    this.handleMenuClose(ev);
    localStorage.removeItem('user');

    // clear apollo cache
    let { client: apolloClient } = this.props;
    apolloClient.resetStore();

    // Redirection
    const { history } = this.props;
    history.push("/");
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
    return(
      <Fragment>
        {`${user.name}`}
        <IconButton
          aria-owns={ !!anchorAccountMenu ? 'menu-appbar' : null }
          aria-haspopup="true" color="inherit"
          onClick={ (ev) => this.setState({ anchorAccountMenu: ev.currentTarget }) }>
          <AccountCircle/>
        </IconButton>
        <Menu
          id="user-menu" anchorEl={ anchorAccountMenu }
          open={ !!anchorAccountMenu } onClose={ this.handleMenuClose }
        >
          <MenuItem onClick={ this.handleMenuClose }>Profile</MenuItem>
          <MenuItem onClick={ this.handleLogout }>Logout</MenuItem>
        </Menu>
      </Fragment>
    )
  }

  renderAccountMenuBeforeLogIn = () => {
    const { anchorAccountMenu } = this.state;
    const { classes } = this.props;
    return(
      <Link to="/login" className={ classes.menuBarText }>
        <IconButton
          aria-owns={ !!anchorAccountMenu ? 'menu-appbar' : null }
          aria-haspopup="true" color="inherit">
          <AccountCircle/>
        </IconButton>
      </Link>
    )
  }

  render() {
    const { appTitle } = this.state;
    const { classes } = this.props;

    let user = !!localStorage.getItem('user') &&
      JSON.parse(localStorage.getItem('user'));

    return(
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link to="/" className={ classes.menuBarText }>{ appTitle }</Link>
          </Typography>

          <Button variant="contained" color="secondary" className={classes.button}>
            <Link to="/top-vote" className={ classes.menuBarText }>Top Vote</Link>
          </Button>
          { this.renderSearch() }
          { user ? this.renderAccountMenuLoggedIn(user.data) : this.renderAccountMenuBeforeLogIn() }
        </Toolbar>
      </AppBar>
    )
  }
}

export default withApollo(withRouter(withStyles(styles)(Header)));
