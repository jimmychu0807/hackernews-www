import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  const middlewares = [ loggerMiddleware, thunkMiddleware ];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const composedEnhancers = composeWithDevTools(middlewareEnhancer);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  return store;
}
