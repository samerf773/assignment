// actions/authActions.js

import { authenticate } from '../services/authService'; 
import { Navigate } from 'react-router-dom';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const login = (username, password) => async (dispatch) => {
  try {
    const user = await authenticate(username, password); 
    dispatch({ type: LOGIN_SUCCESS, payload: { user } });
    localStorage.setItem('token', 'mock_token');
    return { success: true, user }; 
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: { error: error.message } });
    return { success: false, error: error.message }; 
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
  return <Navigate to="/login" />;
};
