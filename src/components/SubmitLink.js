// core/data components
import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";

// styling
import {
  TextField, Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// app libraries
import { SUBMIT_LINK_GQL, LINKS_QUERY_GQL } from './gql';
import { defaultLinksOrder } from '../services/Routing';
import { getQueryVarsFromParam } from '../services/HelperMethods';

const styles = theme => ({
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

  handleDialogClose = ev => {
    this.setState({ url: "", description: "" });
    this.props.handleDialogClose();
  }

  render() {
    let { dialogOpen, handleDialogClose } = this.props;
    let { url, description } = this.state;

    return (<Dialog open={ dialogOpen }
      onClose={ handleDialogClose }
      aria-labelledby="submit-link-dialog-title">
      <DialogTitle id="submit-link-dialog-title">Submit Link</DialogTitle>

      <Mutation
        mutation={ SUBMIT_LINK_GQL }
        variables= {{ url, description }}
        refetchQueries={ [{
          query: LINKS_QUERY_GQL,
          variables: getQueryVarsFromParam(defaultLinksOrder) }] }
        onCompleted={ this.handleDialogClose }>{ (gqlFunc, { loading, error }) => (
        <form onSubmit={ ev => ev.preventDefault() || gqlFunc() }>
          <DialogContent>
            <DialogContentText>
              Share your new found interesting website / news.
            </DialogContentText>
            <TextField id="submit-url" label="URL"
              fullWidth autoFocus required
              type="url"
              value={ url }
              onChange={ this.handleChange('url') }
              margin="normal" />

            <TextField id="submit-description" label="Description"
              fullWidth multiline required
              rows={3} rowsMax={5}
              value={ description }
              onChange={ this.handleChange('description') }
              margin="normal" />
          </DialogContent>

          <DialogActions>
            <Button onClick={ this.handleDialogClose } color="default">Cancel</Button>
            <Button variant="contained" type="submit" color="primary">Submit</Button>
          </DialogActions>
        </form>
      ) }</Mutation>
    </Dialog>)
  }
}

export default withRouter(withStyles(styles)(SubmitLink));
