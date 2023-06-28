import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatsScreen = () => {
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadChats();
    }, []);

    const loadChats = async () => {
        try {
            const storedChats = await AsyncStorage.getItem('chats');
            if (storedChats) {
                setChats(JSON.parse(storedChats));
            }
        } catch (error) {
            console.log('Error loading chats:', error);
        }
    };

    const saveChats = async (chats) => {
        try {
            await AsyncStorage.setItem('chats', JSON.stringify(chats));
        } catch (error) {
            console.log('Error saving chats:', error);
        }
    };

    const handleSend = () => {
        if (message.trim() !== '') {
            const newChat = { id: Date.now().toString(), message };
            const updatedChats = [...chats, newChat];
            setChats(updatedChats);
            saveChats(updatedChats);
            setMessage('');
        }
    };

    return (
        <View style={{ flex: 1, height: '100%', backgroundColor: '#444c38' }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={chats}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                           
                            
                        }}>
                            <View
                                style={{
                                   maxWidth:'85%',
                                    backgroundColor: '#25D366',
                                    paddingHorizontal: 10,
                                    borderRadius: 8,
                                    margin:5,
                                    padding:14,
                                    borderTopRightRadius:0,
                                    borderTopLeftRadius:20,
                                    borderBottomLeftRadius:20,
                                    borderBottomRightRadius:20,
                                }}
                            >
                                <Text style={{
                                    textAlign:'right',
                                    color:'white',
                                    fontSize:13
                                     
                                }}>{item.message}
                                
                                </Text>
                                <Text style={{textAlign:'right',fontSize:12,color:"gray"}}>9:40pm</Text>
                            </View>

                        </View>
                    )}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
                <TextInput
                    style={{
                        flex: 1,
                        marginRight: 8,
                        borderWidth: 1,
                        borderColor: 'gray',
                        padding: 8,
                        color:'white',
                        backgroundColor:'gray',
                        borderRadius:20
                    }}
                    placeholder="Message..."
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                />
                <Button color={'#25D366'} title="Send" onPress={handleSend} />
            </View>
        </View>
    );
};

export default ChatsScreen;
