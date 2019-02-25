// core/data components
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from "react-apollo";

// styling components
import { TextField, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// services
import UserService from '../services/UserService';
import { LOGIN_GQL, SIGNUP_GQL } from './gql.js';

const styles = theme => ({
  form: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'baseline',
    justifyContent: 'space-evenly',
    flexGrow: 1,
    width: 400,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});

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

  handleLogin = loginFunc => async ev => {
    let { email, password } = this.state;
    ev.preventDefault();
    const { data: { userSignIn: result } } = await loginFunc({variables : { email, password } });

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

    return(
      <Mutation mutation={ LOGIN_GQL }>{ (loginFunc, { loading, error }) => (
        <Fragment>
          <Typography variant="h4" gutterBottom>Login</Typography>
          <form id="login-form" autoComplete="off" className={ classes.form }
            onSubmit = { this.handleLogin(loginFunc) }>
            <TextField id="login-email" type="email" className={classes.textField}
              label="Login Email" margin="normal"
              value={ email } onChange={ this.handleChange('email') } />
            <TextField id="password" className={classes.textField}
              label="Password" type="password"
              margin="normal" autoComplete="login-password"
              value={ password } onChange={ this.handleChange('password') } />
            <Button disabled={loading} type="submit"
              variant="contained" color="primary">{ loading ? "Loading..." : "Login" }</Button>
            { showLoginError && <div>Incorrect Login. Please try again.</div> }
          </form>
          <Link to="/signup">Sign up for an account</Link>
        </Fragment>
      )}</Mutation>
    )
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
