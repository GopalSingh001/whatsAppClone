import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ContactScreen from '../screens/ContactScreen';
import StackScreen from '../screens/StackScreen';

const Tabs = createMaterialTopTabNavigator();

const Navigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{

        tabBarActiveTintColor: "#25D366",
        tabBarInactiveTintColor: "white",
        tabBarIndicatorStyle: { backgroundColor: "#25D366" },
        tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' },
        tabBarStyle: { backgroundColor: "gray", borderColor: 'green' },

      }}
    >

      <Tabs.Screen
        name='Chats'
        component={StackScreen}
        options={{ tabBarLabel: 'Chats' }}
      />
      <Tabs.Screen
        name='Contacts'
        component={ContactScreen}
        options={{ tabBarLabel: 'Contacts' }}
      />

    </Tabs.Navigator>
  );
}

export default Navigator;
