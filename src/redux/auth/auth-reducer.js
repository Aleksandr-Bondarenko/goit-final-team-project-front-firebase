import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import {
  registerRequest,
  registerSuccess,
  registerError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  loginRequest,
  loginSuccess,
  loginError,
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoError,
  updateUserBalanceRequest,
  updateUserBalanceSuccess,
  updateUserBalanceError,
} from './auth-actions';

const initialUserInfoState = {
  name: '',
  balance: 0,
  isLoading: false,
  error: null,
};

const uid = createReducer(null, {
  [loginSuccess]: (_, { payload }) => payload.uid,
  [logoutSuccess]: () => null,
});

const token = createReducer(null, {
  [loginSuccess]: (_, { payload }) => payload.token,
  [logoutSuccess]: () => null,
});

const userInfo = createReducer(initialUserInfoState, {
  [getUserInfoRequest]: (state) => ({ ...state, isLoading: true }),
  [getUserInfoSuccess]: (_, { payload }) => ({
    isLoading: false,
    error: null,
    ...payload,
  }),
  [getUserInfoError]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
  [logoutSuccess]: () => initialUserInfoState,

  [updateUserBalanceRequest]: (state) => ({
    ...state,
    isLoading: true,
  }),

  [updateUserBalanceSuccess]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: null,
    balance: payload,
  }),

  [updateUserBalanceError]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
});

const setError = (_, { payload }) => payload;

const error = createReducer(null, {
  [registerError]: setError,
  [registerSuccess]: () => null,
  [registerRequest]: () => null,

  [loginError]: setError,
  [loginSuccess]: () => null,
  [loginRequest]: () => null,

  [logoutError]: setError,
  [logoutError]: () => null,
  [logoutRequest]: () => null,
});

const authReducer = combineReducers({
  uid,
  token,
  error,
  userInfo,
});

export { authReducer };
