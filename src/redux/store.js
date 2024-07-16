// store.js

import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './reducers/authReducer';
import usersReducer from './reducers/usersReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer
  // other reducers
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
