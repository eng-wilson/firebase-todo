import { takeLatest } from 'redux-saga/effects';

/* ------------- Types ------------- */

import { AuthTypes } from '../redux/AuthRedux';
import { TasksTypes } from '../redux/TasksRedux';

/* ------------- Sagas ------------- */
import { getSignIn, getSignUp } from './AuthSagas';

import { getTasks } from './TasksSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  // SignIn
  yield takeLatest(AuthTypes.AUTH_REQUEST, getSignIn);
  yield takeLatest(AuthTypes.SIGN_UP_REQUEST, getSignUp);

  yield takeLatest(TasksTypes.TASKS_REQUEST, getTasks);
}
