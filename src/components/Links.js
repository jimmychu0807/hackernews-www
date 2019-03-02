import React, { Component } from 'react';
import { Query } from "react-apollo";

// styling components
import {
  Grid
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { LINKS_QUERY_GQL } from './gql';
import Link from './Link';
import { getQueryVarsFromParam } from '../services/HelperMethods';

const styles = theme => ({
  linksList: {
    flexDirection: "column",
    justifyContent: "center",
  }
});

class Links extends Component {

  render() {
    const { linksOrder, classes } = this.props;
    const queryVars = getQueryVarsFromParam(linksOrder);

    return(
      <Grid container spacing={ 16 } className={ classes.linksList } >
        <Query query={LINKS_QUERY_GQL} variables={queryVars}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return data.allLinks.nodes.map((link, ind) => (
              <Grid item key={link.id}>
                <Link ind={ind} link={link}/>
              </Grid>
            ))
          } }
        </Query>
      </Grid>
    )
  }
}

export default withStyles(styles)(Links);
