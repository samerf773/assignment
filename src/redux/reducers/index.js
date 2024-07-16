// src/redux/reducers/index.js

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  auth: authReducer, 
  users: usersReducer
});

export default rootReducer;
