import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, PermissionsAndroid, Image, TouchableOpacity } from 'react-native';
import Contacts from 'react-native-contacts';

const ContactsScreen = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        requestContactsPermission();
    }, []);
    const requestContactsPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: 'Contacts Permission',
                    message: 'This app needs access to your contacts.',
                    buttonPositive: 'OK',
                    buttonNegative: 'Cancel',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                fetchContacts();
            } else {
                console.log('Contacts permission denied');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const fetchContacts = () => {
        Contacts.getAll()
            .then((contacts) => {
                setContacts(contacts);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleContactPress = (contactName) => {
        navigation.navigate('Chats', { contactName });
    };
    return (
        <View style={{
            height: '100%'
            , backgroundColor: '#444c38'
        }}>
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.recordID}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleContactPress(item.displayName)}
                    >
                        <View style={{
                            width: "100%",
                            borderBottomColor: "black",
                            borderBottomWidth: .4,
                            padding: 14,
                            paddingTop: 25,
                            paddingBottom: 25,
                            flexDirection: 'row',
                            gap: 8,
                            alignItems: 'center'
                        }}
                        >
                            <View style={{
                                borderRadius: 50,
                                backgroundColor: 'black',
                                padding: 9,
                            }}
                            >
                                <Image style={{
                                    height: 27,
                                    width: 27,
                                }} source={require('../images/contact.png')} />
                            </View>
                            <Text
                                style={{
                                    fontSize: 21,
                                    color: 'white'
                                }}>{item.displayName}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};
export default ContactsScreen;

