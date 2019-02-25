// core/data components
import React, { Component, Fragment } from 'react';
import { Mutation } from "react-apollo";

// styling
import { Typography, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// app libraries
import { SUBMIT_LINK_GQL, LINKS_QUERY_GQL } from './gql';
import { defaultLinksOrder } from '../services/Routing';
import { getQueryVarsFromParam } from '../services/HelperMethods';

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

  render() {
    let { classes } = this.props;
    let { url, description } = this.state;

    return(
      <Fragment>
        <div>
          <Typography variant="h6">Share New Website</Typography>
        </div>
        <Mutation
          mutation={ SUBMIT_LINK_GQL }
          variables= {{ url, description }}
          refetchQueries={ [{
            query: LINKS_QUERY_GQL,
            variables: getQueryVarsFromParam(defaultLinksOrder) }] }
          onCompleted={ (data) => this.props.history.push("/") }
          >{ (submitFunc, { loading, error}) => (
          <form onSubmit={ ev => { ev.preventDefault(); submitFunc() } }>
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

export default withStyles(styles)(SubmitLink);
