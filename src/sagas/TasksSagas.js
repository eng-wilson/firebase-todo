import { call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TasksActions from '../redux/TasksRedux';

export function* getTasks() {
  try {
    const response = yield call(() => AsyncStorage.getItem('@tasks'));

    if (response) {
      yield put(TasksActions.tasksSuccess(JSON.parse(response)));
    } else {
      yield put(TasksActions.tasksSuccess([]));
    }
  } catch (error) {
    yield put(TasksActions.tasksFailure(error.message));
  }
}
