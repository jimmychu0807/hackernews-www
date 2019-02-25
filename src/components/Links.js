import React, { Component } from 'react';
import { Query } from "react-apollo";

import { LINKS_QUERY_GQL } from './gql';
import Link from './Link';
import { getQueryVarsFromParam } from '../services/HelperMethods';

class Links extends Component {

  render() {
    const { linksOrder } = this.props;
    const queryVars = getQueryVarsFromParam(linksOrder);

    return(
      <Query query={LINKS_QUERY_GQL} variables={queryVars}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return data.allLinks.nodes.map((link, ind) =>
            <Link key={link.id} ind={ind} link={link}/>)
        } }
      </Query>
    )
  }
}

export default Links;
