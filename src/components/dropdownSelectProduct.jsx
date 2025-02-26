import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon, IconButton } from 'react-native-paper';
import { searchProduct } from '../services/product';
import { useAuth } from '../contexts/AuthContext';

const DropdownSelectProduct = ({action, selectedProducts}) => {
    const { token } = useAuth();

    const [value, setValue] = useState(null);
    const [label, setLabel] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        const data = await searchProduct(token, {
            search: "",
            limit: "50",
            page: "1",
            order: "nama"
        });
        if(data){
            setProducts(data.data.map((data) => ({label: data.nama, value: data.ID})));
        }else{
            console.log(data);
        }
    };

    function addProducts() {
        let already_product = selectedProducts.find((val) => val.product_id == value) ?? null;
        
        let updatedProducts = selectedProducts;

        if(already_product == null){
            let product = {
                product_id: value,
                product_name: label,
                qty: 1,
                price: 0,
            }
            updatedProducts = [product, ...selectedProducts];
        }else{
            updatedProducts = selectedProducts.map(item => {
                if(item.product_id == value){
                    return { ...item, qty: parseInt(item.qty) + 1 };
                }
                return item;
            });
        }

        action(updatedProducts);
    }

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === value && (
                    <Icon
                        source="check-circle"
                        color="black"
                        size={20}
                    />
                )}
            </View>
        );
    };

    return (
        <View
            style={{
                flexDirection: "row",
                height: 50
            }}
        >
            <Dropdown
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                placeholderStyle={{fontSize: 13}}
                data={products}
                search
                labelField="label"
                valueField="value"
                placeholder="Pilih Produk"
                searchPlaceholder="Cari..."
                value={value}
                onChange={item => {
                    setValue(item.value);
                    setLabel(item.label);
                }}
                renderItem={renderItem}
            />
            <IconButton
                icon="plus"
                iconColor="white"
                style={{
                    width: 50,
                    marginTop: 10,
                    marginHorizontal: 0,
                    backgroundColor: "black",
                    borderTopStartRadius: 0,
                    borderTopEndRadius: 10,
                    borderBottomStartRadius: 0,
                    borderBottomEndRadius: 10,
                }}
                size={24}
                onPress={() => value != null ? addProducts() : alert("Pilih produk terlebih dahulu!")}
            />
        </View>
    );
};

export default DropdownSelectProduct;

const styles = StyleSheet.create({
    dropdown: {
        flexGrow: 1,
        marginTop: 10,
        backgroundColor: 'white',
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10,
        borderTopEndRadius: 0,
        borderBottomEndRadius: 0,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: "black"
    },
    item: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 15,
    },
    selectedTextStyle: {
        fontSize: 15,
    },
    inputSearchStyle: {
        fontSize: 15,
    },
});