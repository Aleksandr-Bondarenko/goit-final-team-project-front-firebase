const getIsAuth = (state) => state.auth.uid;
// const getIsAuth = (state) => state.auth.token;

const getUserName = (state) => state.auth.userInfo.name;

const getCurrentToken = (state) => state.auth.token;

const getAuthError = (state) => state.auth.error;

const getUserBalance = (state) => state.auth.userInfo.balance;

const getIsLoadingUserInfo = (state) => state.auth.userInfo.isLoading;

const getUserId = (state) => state.auth.uid;

export {
  getIsAuth,
  getUserName,
  getCurrentToken,
  getAuthError,
  getUserBalance,
  getUserId,
  getIsLoadingUserInfo,
};
