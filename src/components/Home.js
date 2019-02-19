import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Link from './Link';

const LINKSQUERY = gql`query linksQuery {
  allLinks {
    nodes {
      id url description
      user { id name }
    }
  }
}`;

class Home extends Component {
  render() {
    return(
      <Query query={LINKSQUERY}>
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

export default Home;
