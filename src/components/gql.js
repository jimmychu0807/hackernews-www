import gql from "graphql-tag";

export const SUBMIT_LINK_GQL = gql`
mutation submitLink($url: String!, $description: String) {
  createLink(url: $url, description: $description) {
    errors
    link { id url description }
  }
}`;

export const LINKS_QUERY_GQL = gql`
query linksQuery($sortBy: String, $desc: Boolean) {
  allLinks(sortBy: $sortBy, desc: $desc) {
    nodes {
      id url description votesCount createdAt
      user { id name }
    }
  }
}`;

export const LOGIN_GQL = gql`mutation userSignIn($email: String!, $password: String!) {
  userSignIn(email: $email, password: $password) {
    errors token
    user { id name email }
  }
}`;

export const SIGNUP_GQL = gql`mutation user($name: String!, $email: String!, $password: String!) {
  createUser(name: $name, email: $email, password: $password) {
    errors token
    user { id name email }
  }
}`;
