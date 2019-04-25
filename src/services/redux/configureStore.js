import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

export default function configureStore(preloadedState) {
  let middlewares = [ thunkMiddleware ];
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger());
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);
  const composedEnhancers = composeWithDevTools(middlewareEnhancer);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  return store;
}
