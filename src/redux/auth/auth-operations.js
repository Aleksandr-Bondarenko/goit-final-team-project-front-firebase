import { toast } from 'react-toastify';
// import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import {
  registerRequest,
  registerSuccess,
  registerError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  // logoutError,
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoError,
  updateUserBalanceRequest,
  updateUserBalanceSuccess,
  updateUserBalanceError,
} from './auth-actions';

import { signUpUser, signInUser, signOutUser } from '../../firebase/authApi';
import {
  addUserInfo,
  getUserInfo,
  updateUserInfo,
} from '../../firebase/firestoreApi';

// registration
const register = (credentials) => async (dispatch) => {
  dispatch(registerRequest());

  const { email, password, name } = credentials;

  try {
    const user = await signUpUser(email, password, name);
    dispatch(
      registerSuccess({
        email: user.email,
        name: user.displayName,
      }),
    );
    await addUserInfo(user.uid, name, email);
    return user.uid;
  } catch (error) {
    const { code } = error;
    dispatch(registerError(code));

    toast.error(
      code === 'auth/email-already-in-use' && 'Такий користувач вже існує',
      {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      },
    );
  }
};

// set login
const logIn = (credentials) => async (dispatch) => {
  dispatch(loginRequest());

  const { email, password } = credentials;

  try {
    const response = await signInUser(email, password);
    const payload = {
      uid: response.user.uid,
      token: response.user.accessToken,
    };

    dispatch(loginSuccess(payload));
  } catch (error) {
    const { code } = error;
    dispatch(loginError(code));

    toast.error(
      (code === 'auth/wrong-password' || code === 'auth/user-not-found') &&
        'Такого користувача не існує, спробуйте ще',
      {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      },
    );
  }
};

// get user name
const getCurrentUser = (userId) => async (dispatch, getState) => {
  // const state = getState();
  dispatch(getUserInfoRequest());
  try {
    const data = await getUserInfo(userId);
    const payload = { name: data.name, balance: data.balance };
    dispatch(getUserInfoSuccess(payload));
  } catch (error) {
    dispatch(getUserInfoError(error.message));
  }
};

// exit
const logout = () => (dispatch) => {
  dispatch(logoutRequest());

  try {
    signOutUser();
    dispatch(logoutSuccess());
  } catch (error) {
    console.error(error);
    dispatch(logoutSuccess());
  }
};

const setBalance = (userId, balance) => async (dispatch) => {
  dispatch(updateUserBalanceRequest());
  try {
    updateUserInfo(userId, balance);
    dispatch(updateUserBalanceSuccess(balance));
  } catch (error) {
    console.error(error);
    dispatch(updateUserBalanceError(error));
  }
};

export { register, logIn, getCurrentUser, logout, setBalance };
