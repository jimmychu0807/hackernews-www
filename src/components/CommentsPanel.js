// core/data components
import React, { Component } from 'react';
import { withApollo } from "react-apollo";

// styling components
import {
  TextField, Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  }
});

class CommentsPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: "",
    }
  }

  componentDidMount() {
    const { client: apolloClient } = this.props;

    // Need to load the comments of the link
  }

  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value });
  }

  render() {
    const { link, classes } = this.props;
    const { content } = this.state;

    return(<div className={ classes.wrapper }>
      <TextField id={ `${link.id}-comment` } label="Comment"
        fullWidth multiline required
        rows={ 3 } rowsMax={ 5 }
        value={ content }
        onChange = { this.handleChange('content') }
        margin="normal" />
      <Button color="primary">Submit</Button>
    </div>)
  }
}

export default withStyles(styles)(withApollo(CommentsPanel));
