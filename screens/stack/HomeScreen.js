import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';



const HomeScreen = ({ navigation }) => {
    const [users, setUsers] = useState(null);

    return (
        <View>
            <Text>Home Screen</Text>
            <Button title='Back' onPress={() => navigation.navigate('Chats')} />
        </View>
    );
}

export default HomeScreen;
