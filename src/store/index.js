import { applyMiddleware, compose as defaultCompose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = (initialState = {}) => {
  const {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: compose = defaultCompose,
  } = typeof window === 'object' ? window : {};

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunkMiddleware)),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
