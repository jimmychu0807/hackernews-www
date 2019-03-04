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
      linkGqlCursorAfter: null
    }
  }

  fetchNextPage = (pageInfo, fetchMore) => ev => {
    const { linksOrder } = this.props;
    const after = pageInfo.endCursor;
    const queryVars = getQueryVarsFromParam(linksOrder, after);

    fetchMore({
      variables: queryVars,
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const { allLinks: { nodes: newLinks, pageInfo: newPageInfo }} = fetchMoreResult;
        // Handle no new result
        if (newLinks.length === 0) return previousResult;

        // With new result, we append to the previous result list
        let finalResult = previousResult;
        finalResult.allLinks.pageInfo = newPageInfo;
        finalResult.allLinks.nodes = finalResult.allLinks.nodes.concat(newLinks);

        return finalResult;
      }
    })
  }

  render() {
    const { linksOrder, classes } = this.props;
    const { linkGqlCursorAfter: after } = this.state;
    const queryVars = getQueryVarsFromParam(linksOrder, after);

    return(<Query query={LINKS_QUERY_GQL} variables={queryVars}>
      {({ loading, error, data, fetchMore }) => {
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
                <Grid item key={ "fetchNextPage" } style={{ alignSelf: "center" }}>
                  <Fab onClick={ this.fetchNextPage(pageInfo, fetchMore) }
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
