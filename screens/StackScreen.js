import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './stack/HomeScreen';
import ChatsScreen from './stack/ChatScreen';

const Stacks=createStackNavigator();

const StackScreen = () => {
  return (
     <Stacks.Navigator initialRouteName='Home'>
        <Stacks.Screen name='Contacts' component={HomeScreen}/>
        <Stacks.Screen name='Chats' component={ChatsScreen}/>

     </Stacks.Navigator>
  );
}

export default StackScreen;
