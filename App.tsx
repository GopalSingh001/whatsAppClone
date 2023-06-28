
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import 'react-native-gesture-handler';
import StackScreen from './screens/StackScreen';

const App = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
}
export default App;
