import {
    applyMiddleware,
    combineReducers,
    createStore,
    compose,
} from 'redux';
import thunk from 'redux-thunk';

import cabReducer from './cabBook';

const reducers = combineReducers({
    cabReducer,
});

const middlewares = applyMiddleware(thunk);
const composeEnhancers =
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify your extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const store = createStore(
    reducers,
    composeEnhancers(middlewares),
)

export default store;