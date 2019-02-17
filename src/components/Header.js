import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, InputBase
  } from '@material-ui/core';
import { Search as SearchIcon, AccountCircle
  } from '@material-ui/icons';
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
  state = {
    loggedIn: false,
    appTitle: "Hacker News",
    anchorAccountMenu: null,
  };

  render() {
    const { appTitle, anchorAccountMenu } = this.state;
    const { classes } = this.props;
    const open = Boolean(anchorAccountMenu);

    const renderSearch = (
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
    );

    const renderAccountMenu = (
      <Link to="/login" className={ this.props.classes.menuBarText }>
        <IconButton
          aria-owns={ open ? 'menu-appbar' : null }
          aria-haspopup="true" color="inherit"
        >
          <AccountCircle/>
        </IconButton>
      </Link>
    );

    return(
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link to="/" className={ this.props.classes.menuBarText }>{ appTitle }</Link>
          </Typography>

          <Button variant="contained" color="secondary" className={classes.button}>
            <Link to="/top-vote" className={ this.props.classes.menuBarText }>
              Top Vote
            </Link>
          </Button>
          { renderSearch }
          { renderAccountMenu }
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header);
