 
 import React, { useState } from 'react';
 import { View, Text, FlatList, TextInput, Button } from 'react-native';
 
 const ChatsScreen = () => {
   const [chats, setChats] = useState([]);
   const [message, setMessage] = useState('');
 
   const handleSend = () => {
     if (message.trim() !== '') {
       setChats((prevChats) => [...prevChats, { id: Date.now().toString(), message }]);
       setMessage('');
     }
   };
 
   return (
     <View style={{ flex: 1,height: '100%', backgroundColor:"white"}}>
       <View style={{ flex: 1 }}>
         <FlatList
           data={chats}
           keyExtractor={(item) => item.id}
           renderItem={({ item }) => (
             <View style={{ padding: 8 }}>
               <Text>{item.message}</Text>
             </View>
           )}
         />
       </View>
       <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
         <TextInput
           style={{ flex: 1, marginRight: 8, borderWidth: 1, borderColor: '#ccc', padding: 8 }}
           placeholder="Type a message..."
           value={message}
           onChangeText={(text) => setMessage(text)}
         />
         <Button color={"red"} title="Send" onPress={handleSend} />
       </View>
     </View>
   );
 };
 
 export default ChatsScreen;
 
  