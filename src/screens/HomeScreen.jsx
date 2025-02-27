import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { Button, Appbar, PaperProvider, Modal, Portal, TextInput } from 'react-native-paper';
import { sendNotif } from '../services/notif';

export default function HomeScreen() {
  const { user, logout, token } = useAuth();
  const navigation = useNavigation()
  
  const [modalLoading, setModalLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [notifBody, setNotifBody] = useState({
    topic: null,
    title: null,
    content: null
  });

  const handleSend = async () => {
    setModalLoading(true);
    const response = await sendNotif(token, notifBody);
    
    setModalLoading(false);
    setVisible(false);
    alert(response.message ?? response);
  };

  return (
    <PaperProvider
      style={{
        flex: 1
      }}
    >
        {/* header */}
        <Appbar.Header style={{backgroundColor: "darkblue"}}>
            <Appbar.Content title="Home" color='white' />
            <Appbar.Action icon="logout" color='white' onPress={() => logout(navigation)} />
        </Appbar.Header>

        {/* content */}
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Text>Login as : {user ? (user.first_name +" "+ user.last_name) : "-"}</Text>
            <Button
              style={{
                marginTop: 50,
                backgroundColor: "black"
              }}
              textColor='white'
              onPress={() => setVisible(true)}
            >Test Kirim Notif</Button>
            
        </View>

        {/* modal */}
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={styles.modal}
          >
            {
              !modalLoading ?
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  height: "100%"
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 8
                  }}
                >Kirim Notifikasi ke Semua Device :</Text>
                <TextInput
                  mode='outlined'
                  label='Topic'
                  style={styles.input}
                  outlineColor='black'
                  textColor='black'
                  activeOutlineColor='blue'
                  onChangeText={(val) => setNotifBody({...notifBody, topic: val})}
                />
                <TextInput
                  mode='outlined'
                  label='Judul Notif'
                  style={styles.input}
                  outlineColor='black'
                  textColor='black'
                  activeOutlineColor='blue'
                  onChangeText={(val) => setNotifBody({...notifBody, title: val})}
                />
                <TextInput
                  mode='outlined'
                  label='Isi Notif'
                  style={styles.input}
                  outlineColor='black'
                  textColor='black'
                  activeOutlineColor='blue'
                  onChangeText={(val) => setNotifBody({...notifBody, content: val})}
                />

                <Button
                  style={{
                    backgroundColor: "black",
                    borderRadius: 5,
                    marginTop: 10,
                    height: 50,
                    justifyContent: "center"
                  }}
                  textColor='white'
                  onPress={() => handleSend()}
                >Kirim</Button>
              </View>
              : <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <ActivityIndicator size="large" color="black" />
                <Text style={{marginTop: 20}}>Mengirim Notifikasi...</Text>
              </View>
            }
          </Modal>
        </Portal>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    marginTop: 5
  },
  modal: {
    backgroundColor: "white",
    width: "80%",
    height: 360,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    shadowColor: "#ffffff00",
    padding: 30
  }
})