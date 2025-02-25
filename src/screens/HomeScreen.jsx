import { View, Text, TouchableOpacity } from 'react-native'
import { IconButton, Appbar } from 'react-native-paper';
import color from '../constants/color';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation()

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
            <Text style={{marginBottom: 50}}>Login as : {user ? (user.first_name +" "+ user.last_name) : "-"}</Text>
        </View>
    </View>
  )
}