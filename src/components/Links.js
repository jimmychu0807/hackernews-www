import React, { Component } from 'react';
import { withApollo, Query } from "react-apollo";

// styling components
import {
  Grid, Fab
} from '@material-ui/core';
import {
  Add as AddIcon
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { LINKS_QUERY_GQL } from './gql';
import Link from './Link';
import { getQueryVarsFromParam } from '../services/HelperMethods';
import CONFIG from '../config/Main';

const styles = theme => ({
  linksList: {
    flexDirection: "column",
    justifyContent: "center",
  }
});

class Links extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkGqlFirst: CONFIG.LINKS_PER_PAGE,
      linkGqlCursorAfter: null
    }
  }

  fetchNextPage = pageInfo => ev => {
    const { linkGqlFirst: first } = this.state;
    const { linksOrder } = this.props;
    const after = pageInfo.endCursor;
    const queryVars = getQueryVarsFromParam(linksOrder, first, after);
  }

  render() {
    const { linksOrder, classes } = this.props;
    const { linkGqlFirst: first, linkGqlCursorAfter: after } = this.state;
    const queryVars = getQueryVarsFromParam(linksOrder, first, after);

    return(<Query query={LINKS_QUERY_GQL} variables={queryVars}>
      {({ loading, error, data }) => {

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        const { allLinks: { nodes: links, pageInfo }} = data;

        return(
          <React.Fragment>
            <Grid container spacing={8} className={ classes.linksList } >
              { links.map((link, ind) => (
                <Grid item key={link.id}><Link ind={ind} link={link}/></Grid>
              )) }
              { pageInfo.hasNextPage ? (
                <Grid item key={999} style={{ alignSelf: "center" }}>
                  <Fab onClick={ this.fetchNextPage(pageInfo) }
                    size="small" color="secondary"><AddIcon /></Fab>
                </Grid>)
                : null }
            </Grid>
          </React.Fragment>
        )
      } }
    </Query>)
  }
}

export default withApollo(withStyles(styles)(Links));
