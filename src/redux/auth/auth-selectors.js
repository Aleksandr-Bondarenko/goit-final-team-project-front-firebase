const getIsAuth = (state) => state.auth.isLogin;
// const getIsAuth = (state) => state.auth.token;

const getUserName = (state) => state.auth.user.name;

const getUserEmail = (state) => state.auth.user.email;

const getCurrentToken = (state) => state.auth.token;

const getAuthError = (state) => state.auth.error;

const getUserBalance = (state) => state.auth.user.balance;

export {
  getIsAuth,
  getUserName,
  getUserEmail,
  getCurrentToken,
  getAuthError,
  getUserBalance,
};
