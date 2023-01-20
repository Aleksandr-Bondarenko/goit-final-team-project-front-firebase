import { createAction } from '@reduxjs/toolkit';

export const registerRequest = createAction('auth/registerRequest');
export const registerSuccess = createAction('auth/registerSuccess');
export const registerError = createAction('auth/registerError');

export const loginRequest = createAction('auth/loginRequest');
export const loginSuccess = createAction('auth/loginSuccess');
export const loginError = createAction('auth/loginError');

export const logoutRequest = createAction('auth/logoutRequest');
export const logoutSuccess = createAction('auth/logoutSuccess');
export const logoutError = createAction('auth/logoutError');

export const getUserInfoRequest = createAction('auth/getUserInfoRequest');
export const getUserInfoSuccess = createAction('auth/getUserInfoSuccess');
export const getUserInfoError = createAction('auth/getUserInfoError');

export const updateUserBalanceRequest = createAction(
  'auth/updateUserBalanceRequest',
);
export const updateUserBalanceSuccess = createAction(
  'auth/updateUserBalanceSuccess',
);
export const updateUserBalanceError = createAction(
  'auth/updateUserBalanceError',
);
