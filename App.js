import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import createStore from './src/redux/index';

import Routes from './src/routes';

import('./src/config/ReactotronConfig');

export default function App() {
  const { store, persistor } = createStore;

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={{ flex: 1 }}>
            <Routes />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
