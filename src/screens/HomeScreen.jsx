import { View, Text, TextInput } from 'react-native'
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import EncryptedStorage from "react-native-encrypted-storage";
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation()
  const [notifToken, setNotifToken] = useState(null);

  const getToken = async () => {
    const storedNotifToken = await EncryptedStorage.getItem("notif_token");
    setNotifToken(storedNotifToken);
  };

  useEffect(() => {
    getToken();
  }, [])

  return (
    <View
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
            <Text style={{marginTop: 50, marginBottom: 10, fontWeight: "bold"}}>Notification Token</Text>
            <TextInput
              style={{
                width: "60%",
                borderColor: "black",
                borderWidth: 1
              }}
              value={notifToken}
            />
        </View>
    </View>
  )
}