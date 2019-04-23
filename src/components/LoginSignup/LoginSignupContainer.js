// core/data components
import React, { Component } from 'react';
import LoginSignup from './LoginSignup';

// services
import UserService from '../../services/UserService';
import { LOGIN_GQL, SIGNUP_GQL } from '../../services/gql.js';


class LoginSignupContainer extends Component {
  state = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    showLoginError: false,
    showSignupError: false,
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

  render() {
    const { displayType } = this.props;
    return(
      <LoginSignup
        displayType =  { displayType }
        handleChange = { this.handleChange }
        handleLogin =  { this.handleLogin }
        handleSignup = { this.handleSignup }
        LOGIN_GQL =    { LOGIN_GQL }
        SIGNUP_GQL =   { SIGNUP_GQL }
        { ...this.state }
      />
    );
  }
}

export default LoginSignupContainer;
