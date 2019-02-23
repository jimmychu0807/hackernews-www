import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ApolloConsumer, Mutation } from "react-apollo";
import gql from "graphql-tag";


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

const LOGIN_GQL = gql`mutation userSignIn($login: String!, $password: String!) {
  userSignIn(email: $login, password: $password) {
    token
    user { id name email }
  }
}`;

const DISPLAY_TYPES = ["login", "signup"]

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
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

  handleLogin = loginFunc => ev => {
    let { login, password } = this.state;
    ev.preventDefault();
    loginFunc({variables : { login, password } });
  }

  loginCompleted = ({ userSignIn }, apolloClient) => {
    if (!userSignIn.token) {
      this.setState({ showLoginError: true })
      return;
    }

    // Login correct
    this.setState({ showLoginError: false });
    let user = { token: userSignIn.token, data: userSignIn.user }
    localStorage.setItem('user', JSON.stringify(user));

    // Redirection
    const { history } = this.props;
    history.push("/");
  }

  handleSignUp = ev => {
    // TODO
  }

  renderLoginForm = () => {
    const { classes } = this.props;
    const { login, password, showLoginError } = this.state;

    return(
      <ApolloConsumer>{ apolloClient => (
        <Mutation mutation={ LOGIN_GQL }
          onCompleted={ data => this.loginCompleted(data, apolloClient) }>
          { (loginFunc, { loading, error }) => (
            <form id="login-form" autoComplete="off" className={ classes.form }
              onSubmit = { this.handleLogin(loginFunc) }>
              <Typography variant="h4" gutterBottom>Login</Typography>
              <TextField id="login-email" type="email" className={classes.textField}
                label="Login Email" margin="normal"
                value={ login } onChange={ this.handleChange('login') } />
              <TextField id="password" className={classes.textField}
                label="Password" type="password"
                margin="normal" autoComplete="login-password"
                value={ password } onChange={ this.handleChange('password') } />
              <Button disabled={loading} type="submit"
                variant="contained" color="primary">{ loading ? "Loading..." : "Login" }</Button>

              { showLoginError && <div>Incorrect Login. Please try again.</div> }
              <Link to="/signup">Sign up for an account</Link>
            </form>
          )}
        </Mutation>
      )}</ApolloConsumer>
    )
  }

  renderSignupForm = () => {
    const { classes } = this.props;
    const { login, password, confirmPassword } = this.state;

    return(
      <Fragment>
        <Typography variant="h4" gutterBottom>Sign Up</Typography>
        <form id="signup-form" autoComplete="off" className={ classes.form }>
          <TextField id="login-email" className={classes.textField}
            label="Login Email" margin="normal"
            value={ login } onChange={ this.handleChange('login') } />
          <TextField id="password" className={classes.textField}
            label="Password" type="password"
            margin="normal" autoComplete="login-password"
            value={ password } onChange={ this.handleChange('password') } />
          <TextField id="confirm-password" className={classes.textField}
            label="Confirm Password" type="password"
            margin="normal" autoComplete="off"
            value={ confirmPassword } onChange={ this.handleChange('confirmPassword') } />
          <Button variant="contained" color="primary" onClick={ this.handleSignUp }>Sign Up</Button>
        </form>
        <div>
          <Link to="/login">Login with existing account</Link>
        </div>
      </Fragment>
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

export default withStyles(styles)(Login);
