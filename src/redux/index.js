/* eslint-disable global-require */
import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../sagas';

/* ------------- Assemble The Reducers ------------- */

const rootReducer = combineReducers({
  auth: require('./AuthRedux').reducer,
});

const createStore = configureStore(rootReducer, rootSaga);

export default createStore;
