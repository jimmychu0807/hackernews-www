import { combineReducers } from 'redux';
import { localizeReducer } from "react-localize-redux";

import {
  USER_LOGIN, USER_LOGOUT
} from './actions';

const DEFAULT_APP_STATE = {
  login: null,
};

const DEFAULT_THREAD_STATE = [];

function appReducer(state = DEFAULT_APP_STATE, action) {

  let email = null
  if (action.payload) ({ email } = action.payload);

  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, { login: email });
    case USER_LOGOUT:
      return Object.assign({}, state, { login: null });
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
