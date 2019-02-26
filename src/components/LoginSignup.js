// core/data components
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from "react-apollo";

// styling components
import {
  TextField, Button, Typography, Paper, Avatar,
  Icon
} from '@material-ui/core';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';

// services
import UserService from '../services/UserService';
import { LOGIN_GQL, SIGNUP_GQL } from './gql.js';

const styles = theme => {

  const breakpoint = 400 + theme.spacing.unit * 6;

  return ({
    section: {
      width: 'auto',
      display: 'block',
      [theme.breakpoints.up(breakpoint)]: {
        width: "400px",
        margin: `0 auto`,
      },
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing.unit * 3,
      [theme.breakpoints.up(breakpoint)]: {
        marginTop: theme.spacing.unit * 6,
      },
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.light,
    },
    icon: {
      color: "white",
    },
    title: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit,
    },
    form: {
      width: '100%', // Fix IE issue
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
    },
    submit: {
      margin: `${theme.spacing.unit * 3}px auto`,
    },
    errorMsg: {
      color: "red",
      fontWeight: "bold",
    }
  });
}

const DISPLAY_TYPES = ["login", "signup"]

class LoginSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      showLoginError: false,
      showSignupError: false,
    }
  }

  componentDidMount() {
    loadCSS("https://use.fontawesome.com/releases/v5.7.2/css/all.css",
      document.querySelector("#insertion-point-jss"));
  }

  handleChange = ({ type, errMsgType }) => ev => {
    this.setState({
      [type]: ev.target.value,
      [errMsgType]: false,
    });
  }

  handleLogin = gqlFunc => async ev => {
    ev.preventDefault();
    const { data: { userSignIn: result } } = await gqlFunc();

    // Login incorrect
    if (!result.token) {
      this.setState({ showLoginError: true })
      return;
    }

    // Login correct
    this.setState({ showLoginError: false });
    UserService.login(result.token, result.user)
    this.props.history.push("/");
  }

  handleSignup = gqlFunc => async ev => {
    ev.preventDefault();
    // TODO: Handle signup error, password != confirmPassword, etc

    let { data: { createUser: result } } = await gqlFunc();

    // Login correct
    this.setState({ showSignupError: false });
    UserService.login(result.token, result.user);
    this.props.history.push("/");
  }

  renderLoginForm = () => {
    const { classes } = this.props;
    const { email, password, showLoginError } = this.state;

    return (<section className={ classes.section }>
      <Paper className={ classes.paper }>
        <Avatar className={ classes.avatar }><LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h4" className={ classes.title }>
          Log In
        </Typography>
        <Mutation mutation={ LOGIN_GQL }
          variables={{ email, password }}>{ (gqlFunc, { loading, error }) => (
          <form id="login-form" className={ classes.form }
            onSubmit={ this.handleLogin(gqlFunc) }>
            <TextField id="email" label="E-mail" type="email"
              required fullWidth autoFocus
              margin="normal" autoComplete="email"
              value={ email }
              onChange={ this.handleChange({ type: 'email', errMsgType: 'showLoginError' }) }/>
            <TextField id="password" label="Password" type="password"
              required fullWidth
              margin="normal" autoComplete="password"
              value={ password }
              onChange={ this.handleChange({ type: 'password', errMsgType: 'showLoginError' }) }/>
            <Button className={ classes.submit } type="submit" variant="contained"
              fullWidth size="large" disabled={ loading }
              color="primary">{ loading ? "Loading..." : "Log In" }</Button>

            { showLoginError &&
              <Typography align="center" className={ classes.errorMsg }>
                Incorrect login. Please try again.
              </Typography> }

          </form>
        ) }</Mutation>
        <Link to="/signup">Sign up for an account</Link>
      </Paper>
    </section>)
  }

  renderSignupForm = () => {
    const { classes } = this.props;
    const { name, email, password, confirmPassword, showSignupError } = this.state;

    return(<section className={ classes.section }>
      <Paper className={ classes.paper }>
        <Avatar className={ classes.avatar }>
          <Icon className={ clsx(classes.icon, 'far fa-user fa-fw') } color="secondary"/>
        </Avatar>
        <Typography component="h1" variant="h4" className={ classes.title }>Sign Up</Typography>
        <Mutation
          mutation={ SIGNUP_GQL }
          variables={{ name, email, password }}
          >{ (gqlFunc, { loading }) => (
          <form id="signup-form" className={ classes.form }
            onSubmit={ this.handleSignup(gqlFunc) }>
            <TextField id="name" label="Your Name" type="text"
              required fullWidth autoFocus
              margin="normal" autoComplete="name"
              value={ name }
              onChange={ this.handleChange({ type: 'name', errMsgType: 'showSignupError' }) } />

            <TextField id="email" label="E-mail" type="email"
              required fullWidth
              margin="normal" autoComplete="email"
              value={ email }
              onChange={ this.handleChange({ type: 'email', errMsgType: 'showSignupError' }) } />

            <TextField id="password" label="Password" type="password"
              required fullWidth
              margin="normal" autoComplete="password"
              value={ password }
              onChange={ this.handleChange({ type: 'password', errMsgType: 'showSignupError' }) } />

            <TextField id="confirm-password" label="Confirm Password" type="password"
              required fullWidth
              margin="normal" autoComplete="password"
              value={ confirmPassword }
              onChange={ this.handleChange({ type: 'confirmPassword', errMsgType: 'showSignupError' }) } />

            <Button className={ classes.submit } type="submit" variant="contained"
              fullWidth size="large" disabled={ loading }
              color="primary">{ loading ? "Loading..." : "Sign Up" }</Button>

            { showSignupError &&
              <Typography align="center" className={ classes.errorMsg }>
                Incorrect sign up. Please try again.
              </Typography> }

          </form>
        ) }</Mutation>
        <Link to="/login">Log in with an existing account</Link>
      </Paper>
    </section>)
  }

  render() {
    const { displayType } = this.props;
    if (!DISPLAY_TYPES.includes(displayType)) {
      throw new Error(`Unknown prop displayType: ${displayType}`)
    }
    return (
      displayType === "signup" ? this.renderSignupForm() : this.renderLoginForm()
    )
  }
}

export default withStyles(styles)(LoginSignup);
