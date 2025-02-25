import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import color from "../constants/color";
import { useNavigation } from "@react-navigation/native";

export default function LandingScreen() {
  const navigation = useNavigation();
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "black"
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={require('../assets/icon.png')}/>
        <Text style={{color: "white", marginTop: 10}}>This is Landing Page</Text>
      </View>

      <View
        style={{
          backgroundColor: color.primary,
          padding: 25,
          height: "50%",
          width: "100%",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold"
            }}
          >Mulai</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 50,
    marginTop: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  }
})