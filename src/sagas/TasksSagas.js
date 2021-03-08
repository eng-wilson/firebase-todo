import { call, put } from 'redux-saga/effects';
import firestore from '@react-native-firebase/firestore';

import TasksActions from '../redux/TasksRedux';

export function* getTasks() {
  try {
    let tasks = [];
    yield call(() => firestore().collection('tasks').get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        tasks = [...tasks, { id: documentSnapshot.id, data: documentSnapshot.data() }];
      });
    }));

    if (tasks) {
      yield put(TasksActions.tasksSuccess(tasks));
    } else {
      yield put(TasksActions.tasksSuccess([]));
    }
  } catch (error) {
    yield put(TasksActions.tasksFailure(error.message));
  }
}
