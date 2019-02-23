import apolloClient from "./ApolloClient"

const UserService = {
  currentUser: () => !!localStorage.getItem('user') &&
    JSON.parse(localStorage.getItem('user'))['data'],

  currentUserToken: () => !!localStorage.getItem('user') &&
    JSON.parse(localStorage.getItem('user'))['token'],

  login: (token, user) => {
    let userObj = { token, data: user }
    localStorage.setItem('user', JSON.stringify(userObj));
    apolloClient.resetStore();
  },

  logout: () => {
    localStorage.removeItem('user');
    apolloClient.resetStore();
  }
}

export default UserService;
