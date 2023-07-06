import * as TYPES from './types';

export const removeAuthInfo = payload => ({ type: TYPES.REMOVE_AUTH_INFO, payload });

export const setFailedMessage = payload => ({ type: TYPES.LOGIN_FAILED, payload });

export const setLoginProcessing = payload => ({ type: TYPES.LOGIN_PROCESSING, payload });

export const updateAuthInfo = payload => ({ type: TYPES.UPDATE_AUTH_INFO, payload });

export const requestLogin = ({ identity, password }) => async (dispatch, getState, { $http }) => {
  try {
    dispatch(setFailedMessage(null));
    dispatch(setLoginProcessing(true));
    const { data: { user, token } } = await $http.post('/api/auth/login', { username: identity, password });
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    dispatch(updateAuthInfo({ user, isAuthenticated: !!token }));
  } catch (error) {
    console.log(error);
    dispatch(setFailedMessage("Invalid identity or password"));
  }
  dispatch(setLoginProcessing(false));
};

export const requestLogout = () => (dispatch, getState, { $http }) => {
  $http.defaults.headers.common['Authorization'] = null;
  dispatch(removeAuthInfo());
};