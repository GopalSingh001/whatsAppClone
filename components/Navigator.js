import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ContactScreen from '../screens/ContactScreen';
import HomeScreen from '../screens/stack/HomeScreen';

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
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "Chats" }}
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
