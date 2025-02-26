import { Image, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { useState } from 'react'
import color from '../constants/color';
import { useAuth } from '../contexts/AuthContext';
import { registerUser } from '../services/register';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-paper';

export default function RegisterScreen() {
    const { token, setShowSnackbar, setSnackbarMsg } = useAuth();
    const navigation = useNavigation();

    const [data, setData] = useState({
        nickname: null,
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        password: null,
        otoritas: 1,
        status: "active",
    });
    const [confirmPassword, setConfirmPassword] = useState(null)

    const handleSave = async () => {
        setShowSnackbar(true);

        if(data.nickname && data.first_name && data.last_name && data.email && data.phone && data.password){
            console.log(data.phone.length);
            if (data.phone.length < 11) {
                setSnackbarMsg('Nomor HP minimal 11 karakter!');
                return
            }

            if (data.password != confirmPassword) {
                setSnackbarMsg('Password tidak cocok');
                return
            }

            const response = await registerUser(token, data);
            if(response.status){
                setSnackbarMsg("Register berhasil, silahkan login..");
                navigation.navigate('Login');
            }else{
                alert(response.message);
            }
        }else{
            setSnackbarMsg('Isi data yang diperlukan');
        }
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: color.white
            }}
        >
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 20
                }}
            >
                <Image style={{width: 100, height: 100}} source={require('../assets/icon.png')}/>
            </View>

            <View
                style={{
                    flex: 2,
                    backgroundColor: color.primary,
                    padding: 25,
                    paddingTop: 50,
                    height: "50%",
                    width: "100%",
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                }}
            >
                <TextInput
                    placeholder='Nickname'
                    placeholderTextColor="gray"
                    style={styles.input}
                    onChangeText={(value) => setData({...data, nickname: value})}
                />

                <TextInput
                    placeholder='Nama Depan'
                    placeholderTextColor="gray"
                    style={styles.input}
                    onChangeText={(value) => setData({...data, first_name: value})}
                />

                <TextInput
                    placeholder='Nama Belakang'
                    placeholderTextColor="gray"
                    style={styles.input}
                    onChangeText={(value) => setData({...data, last_name: value})}
                />

                <TextInput
                    placeholder='Email'
                    placeholderTextColor="gray"
                    style={styles.input}
                    onChangeText={(value) => setData({...data, email: value})}
                />

                <TextInput
                    placeholder='No. HP'
                    placeholderTextColor="gray"
                    style={styles.input}
                    onChangeText={(value) => setData({...data, phone: value})}
                    keyboardType='numeric'
                />

                <TextInput
                    placeholder='Password'
                    placeholderTextColor="gray"
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(value) => setData({...data, password: value})}
                />

                <TextInput
                    placeholder='Ulangi Password'
                    placeholderTextColor="gray"
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={setConfirmPassword}
                />

                <TouchableOpacity
                    onPress={() => handleSave()}
                    style={styles.button}
                >
                    <Text
                        style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "white"
                        }}
                    >Daftar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        backgroundColor: "black",
                        borderRadius: 10,
                        marginHorizontal: 30,
                        marginTop: 30,
                        paddingVertical: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row"
                    }}
                >
                    <Icon
                        source="arrow-left-circle"
                        color='white'
                        size={18}
                    />
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "white",
                            marginLeft: 10
                        }}
                    >Kembali</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    borderRadius: 10,
    marginHorizontal: 30,
    marginTop: 10,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: color.white,
    color: "black",
    borderRadius: 10,
    marginHorizontal: 30,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  }
})