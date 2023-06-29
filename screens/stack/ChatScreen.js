// import React, { useState, useEffect,useRef } from 'react';
// import { View, Text, Button,FlatList, TextInput, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ChatsScreen = ({ route }) => {
//     const { contactName } = route.params;
//     const [chats, setChats] = useState([]);
//     const [message, setMessage] = useState('');
//     const flatListRef = useRef(null);
//     useEffect(() => {
//         loadChats();
//     }, []);
//    useEffect(() => {
//     if (flatListRef.current) {
//       flatListRef.current.scrollToEnd({ animated: true });
//     }
//   }, [chats]);
//     const loadChats = async () => {
//         try {
//             const storedChats = await AsyncStorage.getItem(contactName);
//             if (storedChats) {
//                 setChats(JSON.parse(storedChats));
//             }
//         } catch (error) {
//             console.log('Error loading chats:', error);
//         }
//     };
//     const saveChats = async (chats) => {
//         try {
//             await AsyncStorage.setItem(contactName, JSON.stringify(chats));
//         } catch (error) {
//             console.log('Error saving chats:', error);
//         }
//     };
//     const handleSend = () => {
//         if (message.trim() !== '') {
//           const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//           const newChat = { id: Date.now().toString(), message, time: currentTime };
//           const updatedChats = [...chats, newChat];
//           setChats(updatedChats);
//           saveChats(updatedChats);
//           setMessage('');
//         }
//       };
//     return (
//         <View style={{ flex: 1, backgroundColor: '#444c38'}}>
//          <View style={{ flex: 1 }}>
//       <FlatList
//         ref={flatListRef}
//         data={chats}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={{
//             flex: 1,
//             alignItems: 'flex-end',
//           }}>
//             <View
//               style={{
//                 maxWidth: '85%',
//                 backgroundColor: '#25D366',
//                 paddingHorizontal: 10,
//                 borderRadius: 8,
//                 marginVertical: 5,
//                 padding: 14,
//                 alignSelf: 'flex-end',
//                 borderTopLeftRadius: 20,
//                 borderBottomLeftRadius: 20,
//                 borderBottomRightRadius: 20,
//                 marginRight:7,borderTopRightRadius:0
//               }}
//             >
//               <Text style={{
//                 textAlign: 'right',
//                 color: 'white',
//                 fontSize: 13
//               }}>{item.message}</Text>
//               <Text style={{ textAlign: 'right', fontSize: 12, color: "gray" }}>{item.time}</Text>
//             </View>
//           </View>
//         )}
//         contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
//       />
//     </View>
//             <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
//                 <TextInput
//                     style={{
//                         flex: 1,
//                         marginRight: 8,
//                         borderWidth: 1,
//                         borderColor: 'gray',
//                         padding: 8,
//                         color: 'white',
//                         backgroundColor: 'gray',
//                         borderRadius: 20
//                     }}
                    
//                     placeholder="Message..."
//                     value={message}
//                     onChangeText={(text) => setMessage(text)}
//                 />
//                 <Button color={'#25D366'} title="Send" onPress={handleSend} />
//             </View>
//         </View>
//     );
// };

// export default ChatsScreen;

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatsScreen = ({ route }) => {
  const { contactName } = route.params;
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteChatId, setDeleteChatId] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [chats]);

  const loadChats = async () => {
    try {
      const storedChats = await AsyncStorage.getItem(contactName);
      if (storedChats) {
        setChats(JSON.parse(storedChats));
      }
    } catch (error) {
      console.log('Error loading chats:', error);
    }
  };

  const saveChats = async (chats) => {
    try {
      await AsyncStorage.setItem(contactName, JSON.stringify(chats));
    } catch (error) {
      console.log('Error saving chats:', error);
    }
  };

  const handleSend = () => {
    if (message.trim() !== '') {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newChat = { id: Date.now().toString(), message, time: currentTime };
      const updatedChats = [...chats, newChat];
      setChats(updatedChats);
      saveChats(updatedChats);
      setMessage('');
    }
  };

  const openModal = (chatId) => {
    setModalVisible(true);
    setDeleteChatId(chatId);
  };

  const closeModal = () => {
    setModalVisible(false);
    setDeleteChatId(null);
  };

  const handleDelete = () => {
    if (deleteChatId) {
      const filteredChats = chats.filter((chat) => chat.id !== deleteChatId);
      setChats(filteredChats);
      saveChats(filteredChats);
    }
    closeModal();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#444c38' }}>
      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => openModal(item.id)}
              style={{
                flex: 1,
                alignItems: 'flex-end',
              }}
            >
              <View
                style={{
                  maxWidth: '85%',
                  backgroundColor: '#25D366',
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  marginVertical: 5,
                  padding: 14,
                  alignSelf: 'flex-end',
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  marginRight: 7,
                  borderTopRightRadius: 0,
                }}
              >
                <Text style={{ textAlign: 'right', color: 'white', fontSize: 13 }}>{item.message}</Text>
                <Text style={{ textAlign: 'right', fontSize: 12, color: 'gray' }}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
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
            color: 'white',
            backgroundColor: 'gray',
            borderRadius: 20,
          }}
          placeholder="Message..."
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <Button color={'#25D366'} title="Send" onPress={handleSend} />
      </View>
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius:8}}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Delete Message?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center',gap:15 ,marginVertical:20}}>
              <Text style={{fontSize:15,color:'#25D366'}} onPress={closeModal} >Cancal</Text>
              <Text style={{fontSize:15,color:'#25D366'}}  onPress={handleDelete} > Delete for me</Text>
              <Text style={{fontSize:15,color:'#25D366'}}  onPress={handleDelete} > Delete for everyone</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChatsScreen;
