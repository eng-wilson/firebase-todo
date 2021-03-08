import { Alert } from 'react-native';
import { call, put } from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';

import AuthActions from '../redux/AuthRedux';

export function* getSignIn(action) {
  try {
    const { email, password } = action;

    const response = yield call(() => auth().signInWithEmailAndPassword(email, password));

    if (response) {
      // const { refreshToken } = response.user;

      Alert.alert('Success ✅', 'Authenticated successfully');

      yield put(AuthActions.authSuccess(response.user.uid));
    }
  } catch (error) {
    yield put(AuthActions.authFailure(error.message));
  }
}

export function* getSignUp(action) {
  try {
    const { email, password } = action;

    const response = yield call(() => auth().createUserWithEmailAndPassword(email, password));

    if (response) {
      Alert.alert('Success ✅', 'Authenticated successfully');

      yield put(AuthActions.authSuccess(response.user.uid));
    }
  } catch (error) {
    yield put(AuthActions.authFailure(error.message));
  }
}

export function* logout() {
  yield put(AuthActions.logoutSucess());
}
