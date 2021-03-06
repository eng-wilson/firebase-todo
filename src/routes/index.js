import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function Routes() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}
    />
  );
}

export default Routes;
