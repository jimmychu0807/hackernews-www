import React, { Component, Fragment } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
    }
  }

  handleChange = type => ev => {
    this.setState({ [type]: ev.target.value });
  }

  handleLogin = ev => {
    // TODO
  }

  renderLoginForm = () => {
    const { classes } = this.props;
    const { login, password } = this.state;

    return(
      <Fragment>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <form id="#login-form" autoComplete="off" className={ classes.form }>
          <TextField id="login" className={classes.textField}
            label="Login Email" margin="normal"
            value={ login } onChange={ this.handleChange('login') } />
          <TextField id="password" className={classes.textField}
            label="Password" type="password"
            margin="normal" autoComplete="login-password"
            value={ password } onChange={ this.handleChange('password') } />
          <Button variant="contained" color="primary" onClick={ this.handleLogin }>Login</Button>
        </form>
      </Fragment>
    )
  }

  renderSignupForm = () => {
    const { classes } = this.props;
    const { login, password } = this.state;

    return(
      <Fragment>
        <Typography variant="h4" gutterBottom>Sign Up</Typography>
        <form id="#login-form" autoComplete="off" className={ classes.form }>
          <TextField id="login" className={classes.textField}
            label="Login Email" margin="normal"
            value={ login } onChange={ this.handleChange('login') } />
          <TextField id="password" className={classes.textField}
            label="Password" type="password"
            margin="normal" autoComplete="login-password"
            value={ password } onChange={ this.handleChange('password') } />
          <Button variant="contained" color="primary" onClick={ this.handleLogin }>Sign Up</Button>
        </form>
      </Fragment>
    )
  }


  render() {
    return this.renderLoginForm();
  }
}

export default withStyles(styles)(Login);
