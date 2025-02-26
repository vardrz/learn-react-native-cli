import { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import color from "../constants/color";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: color.white
      }}
    >
      <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={require('../assets/icon.png')}/>
      </View>

      <View style={{
          flex: 2,
          backgroundColor: color.primary,
          paddingHorizontal: 35,
          paddingTop: 50,
          height: "50%",
          width: "100%",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <TextInput
          label='Email'
          style={styles.input}
          onChangeText={setEmail}
        />
        <TextInput
          label='Password'
          style={styles.input}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          mode="contained"
          buttonColor="black"
          onPress={() => login(email, password, navigation)}
          style={{borderRadius: 10, marginTop: 15, paddingVertical: 8}}
          labelStyle={{fontSize: 18, fontWeight: "600"}}
        >Masuk</Button>

        <Button
          icon="arrow-right-circle"
          mode="contained"
          buttonColor="black"
          onPress={() => navigation.navigate('Register')}
          style={{borderRadius: 10, marginTop: 5, paddingVertical: 8}}
          contentStyle={{flexDirection: 'row-reverse'}}
          labelStyle={{fontSize: 18, fontWeight: "600"}}
        >Daftar</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: color.white,
    color: "black",
    marginTop: 5,
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
})