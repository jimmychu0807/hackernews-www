/***
  - the app redux shape
  state: {
    app: {
      login:
    },
    threads: [ {
      subject:
      link:
      like: 5
      user:
      postTime:
      comments: {
        [{
          message:
          like(not yet):
          user:
          postTime:
          comments(not yet): { [ ... ] }
        }, {
          ...
        }]
      }
    }, {
      ...
    }]
  }
***/
export const USER_LOGIN =          'USER_LOGIN';
export const USER_LOGOUT =         'USER_LOGOUT';

export const userLogin = (email, password) => ({
  type: USER_LOGIN,
  payload: { email, password },
});

export const userLogout = () => ({
  type: USER_LOGOUT,
  payload: null,
});
