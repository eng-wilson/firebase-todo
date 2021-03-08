import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { seamlessImmutableReconciler } from 'redux-persist-seamless-immutable';
import { persistStore, persistReducer } from 'redux-persist';
import Reactotron from '../config/ReactotronConfig';

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = null;
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  middleware.push(sagaMiddleware);

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));
  enhancers.push(Reactotron.createEnhancer());

  /* ------------- AutoRehydrate Enhancer ------------- */

  // add the autoRehydrate enhancer
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['alert'],
    stateReconciler: seamlessImmutableReconciler,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, compose(...enhancers));
  const persistor = persistStore(store);

  // kick off root saga
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
