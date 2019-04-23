// core/data components
import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from "react-apollo";

// styling components
import {
  TextField, Button, Typography, Paper, Avatar,
  Icon
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

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

const DISPLAY_TYPES = ["login", "signup"];

const SignupForm = props => {
  const { classes, name, email, password, confirmPassword,
    showSignupError } = props;
  return (
    <section className={ classes.section }>
      <Paper className={ classes.paper }>
        <Avatar className={ classes.avatar }>
          <Icon className={ clsx(classes.icon, 'far fa-user fa-fw') }/>
        </Avatar>
        <Typography component="h1" variant="h4" className={ classes.title }>Sign Up</Typography>
        <Mutation
          mutation={ props.SIGNUP_GQL }
          variables={{ name, email, password }}
          >{ (gqlFunc, { loading }) => (
          <form id="signup-form" className={ classes.form }
            onSubmit={ props.handleSignup(gqlFunc) }>
            <TextField id="name" label="Your Name" type="text"
              required fullWidth autoFocus
              margin="normal" autoComplete="name"
              value={ name }
              onChange={ props.handleChange({ type: 'name', errMsgType: 'showSignupError' }) } />

            <TextField id="email" label="E-mail" type="email"
              required fullWidth
              margin="normal" autoComplete="email"
              value={ email }
              onChange={ props.handleChange({ type: 'email', errMsgType: 'showSignupError' }) } />

            <TextField id="password" label="Password" type="password"
              required fullWidth
              margin="normal" autoComplete="password"
              value={ password }
              onChange={ props.handleChange({ type: 'password', errMsgType: 'showSignupError' }) } />

            <TextField id="confirm-password" label="Confirm Password" type="password"
              required fullWidth
              margin="normal" autoComplete="password"
              value={ confirmPassword }
              onChange={ props.handleChange({ type: 'confirmPassword', errMsgType: 'showSignupError' }) } />

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
    </section>
  );
};

const LoginForm = props => {
  const { classes, email, password, showLoginError } = props;
  return (
    <section className={ classes.section }>
      <Paper className={ classes.paper }>
        <Avatar className={ classes.avatar }>
          <Icon className={ clsx(classes.icon, "fas fa-fw fa-sign-in-alt") } />
        </Avatar>
        <Typography component="h1" variant="h4" className={ classes.title }>Log In</Typography>
        <Mutation mutation={ props.LOGIN_GQL }
          variables={{ email, password }}>{ (gqlFunc, { loading, error }) => (
          <form id="login-form" className={ classes.form }
            onSubmit={ props.handleLogin(gqlFunc) }>
            <TextField id="email" label="E-mail" type="email"
              required fullWidth autoFocus
              margin="normal" autoComplete="email"
              value={ email }
              onChange={ props.handleChange({ type: 'email', errMsgType: 'showLoginError' }) }/>
            <TextField id="password" label="Password" type="password"
              required fullWidth
              margin="normal" autoComplete="password"
              value={ password }
              onChange={ props.handleChange({ type: 'password', errMsgType: 'showLoginError' }) }/>
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
    </section>
  );
};

const LoginSignup = props => {
  const { displayType } = props;
  if (!DISPLAY_TYPES.includes(displayType))
    throw new Error(`Unknown prop displayType: ${displayType}`);

  return (
    <React.Fragment>
      { displayType === "signup" ?
        <SignupForm {...props} /> :
        <LoginForm {...props} /> }
    </React.Fragment>
  )
}

export default withStyles(styles)(LoginSignup);
