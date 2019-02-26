// core/data components
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from "react-apollo";

// styling components
import {
  TextField, Button, Typography, Paper, Avatar
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
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
    }
  }

  handleChange = type => ev => {
    this.setState({
      [type]: ev.target.value,
      showLoginError: false,
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

  handleSignUp = signUpFunc => async ev => {
    let { name, email, password } = this.state;
    ev.preventDefault();
    let { data: { createUser: result } } = await signUpFunc({ variables: { name, email, password } });

    // TODO: Handle signup error, password != confirmPassword, etc

    // Login correct
    this.setState({ showLoginError: false });
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
              value={ email } onChange={ this.handleChange('email') }/>
            <TextField id="password" label="Password" type="password"
              required fullWidth
              margin="normal" autoComplete="password"
              value={ password } onChange={ this.handleChange('password') }/>
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
    const { name, email, password, confirmPassword } = this.state;

    return(
      <Mutation mutation={SIGNUP_GQL}>{ (signUpFunc, { loading, error }) => (
        <Fragment>
          <Typography variant="h4" gutterBottom>Sign Up</Typography>
          <form id="signup-form" autoComplete="off" className={ classes.form }
            onSubmit={ this.handleSignUp(signUpFunc) }>
            <TextField id="login-name" className={classes.textField}
              label="Name" margin="normal"
              value={ name } onChange={ this.handleChange('name') } />
            <TextField id="login-email" className={classes.textField}
              label="Login Email" margin="normal"
              value={ email } onChange={ this.handleChange('email') } />
            <TextField id="password" className={classes.textField}
              label="Password" type="password"
              margin="normal" autoComplete="login-password"
              value={ password } onChange={ this.handleChange('password') } />
            <TextField id="confirm-password" className={classes.textField}
              label="Confirm Password" type="password"
              margin="normal" autoComplete="off"
              value={ confirmPassword } onChange={ this.handleChange('confirmPassword') } />
            <Button disabled={ loading } type="submit"
              variant="contained" color="primary">
              { loading ? "Loading..." : "Sign Up" }</Button>
          </form>
          <Link to="/login">Login with existing account</Link>
        </Fragment>
      ) }</Mutation>
    )
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
