import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  tasksRequest: null,
  tasksSuccess: ['tasks'],
  tasksFailure: ['error'],
});

export const TasksTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  tasks: [],
  fetching: false,
  error: null,
});

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state) => state.merge({ fetching: true });

// we've successfully logged in
export const success = (state, action) => {
  const { tasks } = action;

  return state.merge({ fetching: false, error: null, tasks });
};
// we've had a problem logging in
export const failure = (state, { error }) => state.merge({ fetching: false, error });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TASKS_REQUEST]: request,
  [Types.TASKS_SUCCESS]: success,
  [Types.TASKS_FAILURE]: failure,

});
