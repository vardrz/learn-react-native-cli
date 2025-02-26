import { View, Text, TouchableOpacity, ScrollView, RefreshControl, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { searchProduct } from '../../services/product';
import { useDebounce } from 'use-debounce';
import { useNavigation } from '@react-navigation/native';
import { Appbar, Searchbar } from 'react-native-paper';

export default function ProductScreen() {
  const { token } = useAuth();
  const [products, setProducts] = useState(null);
  const navigation = useNavigation();

  // search
  const [search, setSearch] = useState('');
  const [searchKey] = useDebounce(search, 500);
  
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    
    handleSearchProduct("");

    setRefreshing(false);
  };

  useEffect(() => {
    if (token) {
      handleSearchProduct("");
    }
  }, [])

  useEffect(() => {
    handleSearchProduct(searchKey);
  }, [searchKey])

  const handleSearchProduct = async (keyword) => {
    setLoading(true);
    setProducts(null);
  
    try {
      let body = {
        search: keyword,
        limit: "50",
        page: "1",
        order: "nama",
      }

      const data = await searchProduct(token, body);
      
      setProducts(data.data);
    } catch (error) {
      console.error("Failed to search product:", error);
    }
    
    setLoading(false);
  };

  return (
    <View
      style={{
          flex: 1
      }}
    >
      {/* header */}
      <Appbar.Header style={{backgroundColor: "darkblue"}}>
          <Appbar.Content title="Produk" color='white' />
          <Appbar.Action icon="plus" color='white' onPress={() => navigation.navigate('AddProduct')} />
      </Appbar.Header>

      <View
        style={{
          width: "100%",
          paddingVertical: 10,
          paddingHorizontal: 25,
          backgroundColor: "#f0f0f0",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Searchbar
          placeholder="Cari..."
          style={{
            backgroundColor: "white",
            borderRadius: 10
          }}
          onChangeText={setSearch}
          value={search}
        />
      </View>

      {/* content */}
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingHorizontal: 15
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['grey']}
            progressBackgroundColor={'black'}
          />
        }
      >
        {
          products ?
            products.map((data) => {
            return (
              <TouchableOpacity
                key={data.ID}
                style={{
                  width: '100%',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: "#f0f0f0"
                }}
                onPress={() => navigation.navigate('DetailProduct', data)}
              >
                <Text>{data.nama}</Text>
              </TouchableOpacity>
            )
            })
          : (
            <Text
              style={{
                textAlign: "center",
                marginTop: 30
              }}
            >{loading ? "Load products...." : "Products not available"}</Text>
          )
        }
      </ScrollView>
    </View>
  )
}