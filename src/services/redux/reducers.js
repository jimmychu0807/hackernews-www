import { combineReducers } from 'redux';
import { localizeReducer } from "react-localize-redux";

import {
  USER_LOGIN, USER_LOGOUT, CHANGE_LANG
} from './actions';

const DEFAULT_APP_STATE = {
  login: null,
  lang: "en",
};

const DEFAULT_THREAD_STATE = [];

function appReducer(state = DEFAULT_APP_STATE, action) {

  let email = null, lang = null;
  if (action.payload) ({ email, lang } = action.payload);

  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, { login: email });
    case USER_LOGOUT:
      return Object.assign({}, state, { login: null });
    case CHANGE_LANG:
      return Object.assign({}, state, { lang });
    default: return state;
  }
}

function threadReducer(state = DEFAULT_THREAD_STATE, action) {
  return state;
}

const rootReducer = combineReducers({
  app: appReducer,
  threads: threadReducer,
  localize: localizeReducer,
});

export default rootReducer;
