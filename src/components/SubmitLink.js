// core/data components
import React, { Component, Fragment } from 'react';
import { Mutation, withApollo } from "react-apollo";
import gql from "graphql-tag";

// styling
import { Typography, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

const SUBMIT_LINK_GQL = gql`mutation submitLink($url: String!, $description: String) {
  createLink(url: $url, description: $description) {
    errors
    link { id url description }
  }
}`;

class SubmitLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      description: "",
    };
  }

  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value });
  }

  handleSubmitLink = submitFunc => async ev => {
    ev.preventDefault();
    let { url, description } = this.state;

    await submitFunc({ variables: { url, description }});

    // Redirection
    this.props.history.push("/");
  }

  render() {
    let { classes } = this.props;

    return(
      <Fragment>
        <div>
          <Typography variant="h6">Share New Website</Typography>
        </div>
        <Mutation mutation={ SUBMIT_LINK_GQL}>{ (submitFunc, { loading, error}) => (
          <form onSubmit={ this.handleSubmitLink(submitFunc) }>
            <TextField
              id="url"
              label="URL"
              className={classes.textField}
              value={ this.state.url }
              onChange={ this.handleChange('url') }
              margin="normal"
            />

            <TextField
              multiline
              id="description"
              label="Description"
              className={ classes.textField }
              value={ this.state.description }
              onChange={ this.handleChange('description') }
              margin="normal"
            />

            <Button type="submit" variant="contained" className={classes.button}
              color="primary">Submit</Button>
          </form>
        ) }</Mutation>
      </Fragment>
    )
  }
}

export default withApollo(withStyles(styles)(SubmitLink));
