import { Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { updateProduct } from '../../services/product'
import { useAuth } from '../../contexts/AuthContext'
import { Button, PaperProvider } from 'react-native-paper'

export default function EditProduct() {
    const { token } = useAuth();
    const navigation = useNavigation();
    const product = useRoute().params;
    
    const [data, setData] = useState({
        nama: product.nama,
        deskripsi: product.deskripsi,
    })

    function validation() {
        if(data.nama == product.nama && data.deskripsi == product.deskripsi){
            alert("Tidak ada yang diubah!");
            return
        }

        if(data.nama && data.deskripsi){
            handleSave();
        }else{
            alert("Isi data yang dibutuhkan")
        }
    }

    const handleSave = async () => {
        const response = await updateProduct(token, product.ID, data);

        if(response.status){
            alert("Berhasil memperbarui produk");
            navigation.navigate("Main", { screen: "Produk" })
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
                >Edit Produk</Text>
                
                <TextInput
                    placeholder='Nama Produk'
                    placeholderTextColor="gray"
                    style={styles.input}
                    defaultValue={product.nama}
                    onChangeText={(value) => setData({...data, nama: value})}
                />
                <TextInput
                    placeholder='Deskripsi Produk'
                    placeholderTextColor="gray"
                    style={styles.input}
                    defaultValue={product.deskripsi}
                    onChangeText={(value) => setData({...data, deskripsi: value})}
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