/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native'
import Navigator from './components/Navigator';
 
 

 
function App(): JSX.Element {


  return (

    <NavigationContainer>
      <Text style={{
        fontSize:20,
        borderWidth:0.5,
        color:"white",
        backgroundColor:'gray',
        borderBottomColor:"black",
        padding:10,
        paddingStart:20
      }}>WhatsApp</Text>
      <Navigator/>
    </NavigationContainer>

  );
}
export default App;
