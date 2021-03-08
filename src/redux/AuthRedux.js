import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  authRequest: ['email', 'password'],
  signUpRequest: ['email', 'password'],
  authSuccess: ['uid'],
  authFailure: ['error'],
  logoutRequest: null,
  logoutSucess: null,
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  uid: null,
  fetching: false,
  error: null,
});

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state) => state.merge({ fetching: true });

// we've successfully logged in
export const success = (state, action) => {
  console.tron.logImportant(action);
  const { uid } = action;

  return state.merge({ fetching: false, error: null, uid });
};
// we've had a problem logging in
export const failure = (state, { error }) => state.merge({ fetching: false, error });

// we've logged out
export const logout = (state) => state.merge({
  uid: null,
  fetching: false,
  error: null,
});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_REQUEST]: request,
  [Types.SIGN_UP_REQUEST]: request,
  [Types.AUTH_SUCCESS]: success,
  [Types.AUTH_FAILURE]: failure,
  [Types.LOGOUT_REQUEST]: request,
  [Types.LOGOUT_SUCESS]: logout,
});

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState) => loginState.accessToken !== null;
