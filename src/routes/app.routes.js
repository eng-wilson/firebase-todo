import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import AddTask from '../pages/AddTask';
import TaskDetails from '../pages/TaskDetails';

const App = createStackNavigator();

function AppRoutes() {
  return (
    <App.Navigator screenOptions={{
      headerShown: false,
    }}
    >
      <App.Screen name="Home" component={Home} />
      <App.Screen name="AddTask" component={AddTask} />
      <App.Screen name="TaskDetails" component={TaskDetails} />
    </App.Navigator>
  );
}

export default AppRoutes;
