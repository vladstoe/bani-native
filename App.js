// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginRegisterPage from './LoginRegisterPage';
import GamePage from './GamePage';
import MyAccountPage from './MyAccountPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginRegister" component={LoginRegisterPage} options={{ headerShown: false }} />
        <Stack.Screen name="Game" component={GamePage} options={{ headerShown: false }} />
        <Stack.Screen name="MyAccount" component={MyAccountPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
