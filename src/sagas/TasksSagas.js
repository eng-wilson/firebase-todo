import { call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import TasksActions from '../redux/TasksRedux';

export function* getTasks(action) {
  try {
    let tasks = [];
    const { uid } = action;

    yield call(() => firestore().collection('tasks').where('uid', '==', uid).orderBy('date', 'asc')
      .get()
      .then((querySnapshot) => {
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
    Alert.alert('Não foi possível realizar a ação', 'Tente novamente');
    yield put(TasksActions.tasksFailure(error.message));
  }
}
