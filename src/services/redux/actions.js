/***
  - the app redux shape
  state: {
    app: {
      login:
      lang:
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
export const USER_LOGIN   = 'USER_LOGIN';
export const USER_LOGOUT  = 'USER_LOGOUT';

export function userLogin(email, password) {
  return {
    type: USER_LOGIN,
    payload: { email, password },
  }
}

export function userLogout() {
  return {
    type: USER_LOGOUT,
    payload: null,
  }
}
