import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Link from './Link';

const LINKSQUERY = gql`query linksQuery($sortBy: String, $desc: Boolean) {
  allLinks(sortBy: $sortBy, desc: $desc) {
    nodes {
      id url description votesCount createdAt
      user { id name }
    }
  }
}`;

class Links extends Component {
  getQueryVarsFromParam = (param) => {
    let res = param.split("-");
    return { sortBy: res[0], desc: (res[1] === "desc") };
  }

  render() {
    const { linksOrder } = this.props;
    const queryVars = this.getQueryVarsFromParam(linksOrder);

    return(
      <Query query={LINKSQUERY} variables={queryVars}>
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
