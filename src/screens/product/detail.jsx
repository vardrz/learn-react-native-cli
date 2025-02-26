import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { deleteProduct } from '../../services/product';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Dialog, Portal, PaperProvider } from 'react-native-paper';

export default function DetailProduct() {
    const { token } = useAuth();
    const navigation = useNavigation();

    const [visible, setVisible] = useState(false);
    const data = useRoute().params;
    console.log(data);

    const handleConfirmDelete = () => {
        setVisible(true);
    };

    const handleDelete = async () => {
        console.log(`deleted id: ${data.ID}`);
        setVisible(false);
        
        const response = await deleteProduct(token, data.ID);
        
        if(response.status){
            alert("Produk dihapus");
            navigation.navigate("Main", {screen: "Produk"})
        }else{
            alert(titleCase(response.errors));
        }

        function titleCase(word) {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
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
            >Detail Produk</Text>

            <View
                style={{
                    alignItems: "baseline",
                    width: "100%"
                }}
            >
                <Text style={styles.text}>{data.nama}</Text>
                <Text style={styles.text}>{"Deskripsi : " + data.deskripsi}</Text>
            </View>

            <Button
                onPress={() => navigation.navigate('EditProduct', data)}
                style={{
                    height: 45,
                    backgroundColor: "blue",
                    borderRadius: 10,
                    marginTop: 10,
                    justifyContent: "center"
                }}
                textColor='white'
            >Edit</Button>
            <Button
                onPress={() => handleConfirmDelete()}
                style={{
                    height: 45,
                    backgroundColor: "red",
                    borderRadius: 10,
                    marginTop: 10,
                    justifyContent: "center"
                }}
                textColor='white'
            >Hapus</Button>
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

            {/* confirm */}
            <Portal>
                <Dialog style={{borderRadius: 10}} visible={visible} onDismiss={() => setVisible(false)}>
                    <Dialog.Title>Konfirmasi</Dialog.Title>
                    <Dialog.Content>
                        <Text style={{color: "white"}}>Hapus produk ini?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button textColor='gray' onPress={() => setVisible(false)}>Batal</Button>
                        <Button textColor='red' onPress={() => handleDelete()}>Hapus</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollView>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    text: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#f0f0f0",
        borderRadius: 10,
        marginBottom: 10
    }
})