import { Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { updateCustomer } from '../../services/customer'
import { useAuth } from '../../contexts/AuthContext'
import { Button, PaperProvider } from 'react-native-paper'

export default function EditCustomer() {
    const { token } = useAuth();
    const navigation = useNavigation();
    const customer = useRoute().params;
    
    const [data, setData] = useState({
        name: customer.name,
        address: customer.address,
        phone: customer.phone,
    })

    function validation() {
        if(data.name && data.address && data.phone){
            if(data.phone.length < 11){
                alert('Nomor telepon minimal 11 karakter!');
                return
            }

            handleSave();
        }else{
            alert("Isi data yang dibutuhkan")
        }
    }

    const handleSave = async () => {
        const response = await updateCustomer(token, customer.ID, data);

        if(response.status){
            alert("Berhasil update data customer");
            navigation.navigate("Main", { screen: "Customer" })
        }else{
            alert(response.message);
        }
    }

    return (
        <PaperProvider>
            <ScrollView
                style={{
                    backgroundColor: "white",
                    flex: 1,
                    paddingHorizontal: 30
                }}
            >
                <Text
                    style={{
                        width: "100%",
                        textAlign: "center",
                        paddingTop: 50,
                        marginBottom: 20,
                        fontSize: 25,
                        fontWeight: "600",
                    }}
                >Edit Customer</Text>
                
                <TextInput
                    placeholder='Name'
                    placeholderTextColor="gray"
                    style={styles.input}
                    defaultValue={customer.name}
                    onChangeText={(value) => setData({...data, name: value})}
                />
                <TextInput
                    placeholder='Address'
                    placeholderTextColor="gray"
                    style={styles.input}
                    defaultValue={customer.address}
                    onChangeText={(value) => setData({...data, address: value})}
                />
                <TextInput
                    placeholder='Phone'
                    placeholderTextColor="gray"
                    keyboardType="numeric"
                    style={styles.input}
                    defaultValue={customer.phone}
                    onChangeText={(value) => setData({...data, phone: value})}
                />
                
                <Button
                    onPress={() => validation()}
                    style={{
                        height: 45,
                        backgroundColor: "black",
                        borderRadius: 10,
                        marginTop: 10,
                        justifyContent: "center"
                    }}
                    textColor='white'
                >Simpan</Button>
                <Button
                    onPress={() => navigation.goBack()}
                    style={{
                        height: 45,
                        backgroundColor: "gray",
                        borderRadius: 10,
                        marginTop: 10,
                        marginBottom: 50,
                        justifyContent: "center"
                    }}
                    textColor='white'
                >Kembali</Button>
            </ScrollView>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    border: "black"
  }
})