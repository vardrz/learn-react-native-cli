import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from 'react-native-paper'
import { toRupiah } from 'to-rupiah'

export default function DetailOrder() {
    const navigation = useNavigation();
    const data = useRoute().params;
    const products = data.details;

    return (
        <ScrollView
            style={{
                backgroundColor: "white",
                flex: 1,
                paddingHorizontal: 30
            }}
        >
            <View
                style={{
                    width: "100%"
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
                >Detail Order</Text>
                <TextInput
                    placeholder='Nomor Order'
                    style={styles.inputReadOnly}
                    defaultValue={data.order_number}
                    readOnly
                />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20,
                        marginHorizontal: 5
                    }}
                >
                    <Text style={{fontSize: 18}}>Customer</Text>
                    <Text style={{fontSize: 18}}>{data.customer_name}</Text>
                </View>

                {/* products */}
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginTop: 10,
                        marginHorizontal: 5
                    }}
                />
                {
                    products.map((product) => (
                        <View
                            key={product.product_id}
                            style={{
                                marginHorizontal: 5,
                                marginTop: 10
                            }}
                        >
                            <Text>{product.product.nama}</Text>

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >
                                <Text>{toRupiah(product.price, { dot: '.', floatingPoint: 0 }) + " x " + product.qty}</Text>
                                <Text>{toRupiah(product.price*product.qty, { dot: '.', floatingPoint: 0 })}</Text>
                            </View>
                        </View>
                    ))
                }

                {/* summaries */}
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginHorizontal: 5,
                        marginVertical: 20
                    }}
                />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 5
                    }}
                >
                    <Text style={{fontSize: 18}}>Subtotal</Text>
                    <Text style={{fontSize: 18}}>{toRupiah(data.subtotal, { dot: '.', floatingPoint: 0 })}</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 5,
                        marginHorizontal: 5
                    }}
                >
                    <Text style={{fontSize: 18}}>Diskon</Text>
                    <Text style={{fontSize: 18}}>{toRupiah(data.discount, { dot: '.', floatingPoint: 0 })}</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 5,
                        marginHorizontal: 5
                    }}
                >
                    <Text style={{fontSize: 20, fontWeight: "700"}}>Total</Text>
                    <Text style={{fontSize: 20, fontWeight: "700"}}>{toRupiah((data.subtotal-data.discount), { dot: '.', floatingPoint: 0 })}</Text>
                </View>
            </View>

            <Button
                onPress={() => {
                    let order = {
                        id: data.id,
                        order_number: data.order_number,
                        customer_id: data.customer_id,
                        discount: data.discount,
                        subtotal: data.subtotal,
                        details: data.details
                    };

                    navigation.push('EditOrder', order);
                }}
                style={{
                    height: 45,
                    backgroundColor: "black",
                    borderRadius: 10,
                    marginTop: 30,
                    justifyContent: "center"
                }}
                textColor='white'
            >Edit</Button>
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    inputReadOnly: {
        backgroundColor: "#e8e8e8",
        color: "black",
        borderRadius: 10,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        border: "black"
    },
    input: {
        backgroundColor: "white",
        color: "black",
        borderRadius: 10,
        marginTop: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        border: "black"
    }
})