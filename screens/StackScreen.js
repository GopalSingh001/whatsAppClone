import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatsScreen from './stack/ChatScreen';
import Navigator from '../components/Navigator';

const Stack = createStackNavigator();
const StackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: 'gray',
          borderBottomColor: 'black',
          borderWidth: 0.5,
        },
        headerTitleStyle: {
          fontSize: 20,
          color: 'white',
          padding: 10,
        },
        headerTitle: getHeaderTitle(route),
      })}
    >
      <Stack.Screen name="WhatsApp" component={Navigator}/>
      <Stack.Screen name="Chats" component={ChatsScreen} />
    </Stack.Navigator>
  );
};

const getHeaderTitle = (route) => {
  const { params } = route; 
  const contactName = params && params.contactName ? params.contactName : 'WhatsApp';
  return contactName;
};
export default StackScreen;
