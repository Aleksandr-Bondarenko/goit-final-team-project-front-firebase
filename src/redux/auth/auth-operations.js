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
  getCurrentUserError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
} from './auth-actions';

// import { token, fetchSignUp, fetchLogin, fetchLogout } from 'services/fetchApi';
import { signUpUser, signInUser, signOutUser } from '../../firebase/authApi';
import { addUserInfo, getUserInfo } from '../../firebase/firestoreApi';

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
    console.log('>>>user', user);
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
    const userInfo = await getUserInfo(response.user.uid);
    console.log('>>>userInfo', userInfo);
    const loginPayload = {
      user: {
        email: response.user.email,
        name: response.user.displayName,
        balance: 0,
      },
      token: response.user.accessToken,
    };

    dispatch(loginSuccess(loginPayload));
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
  // const {
  //   auth: { token: prsistedToken },
  // } = getState();

  // if (!prsistedToken) {
  //   return;
  // }
  // token.set(prsistedToken);
  const state = getState();
  console.log('>>>state', state);

  // dispatch(getCurrentUserRequest);
  // try {
  //   const state = getState();
  //   console.log('>>>state', state);
  //   const data = await getUserInfo(userId);
  //   console.log('>>>data', data);
  //   // dispatch(getCurrentUserSuccess(data));
  // } catch (error) {
  //   console.log('>>>error', error);
  // }

  // axios
  //   .get('users/current')
  //   .then(({ data }) => dispatch(getCurrentUserSuccess(data)))
  //   .catch((err) => getCurrentUserError(err.message));
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

export { register, logIn, getCurrentUser, logout };
