import { View, Text, ScrollView, RefreshControl, TextInput, TouchableOpacity } from 'react-native'
import { Appbar, Searchbar } from 'react-native-paper'
import { AllOrder, GetOrderByNumber } from '../services/order';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { toRupiah } from 'to-rupiah';

export default function OrderScreen() {
  const { token } = useAuth();
  const [orders, setOrders] = useState(null);
    
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
    
  const onRefresh = () => {
    setRefreshing(true);
    
    handleSearchOrder("");

    setRefreshing(false);
  };
  
  useEffect(() => {
    if (token) {
      handleSearchOrder("");
    }
  }, [])

  // search
  const [search, setSearch] = useState('');
  const [searchKey] = useDebounce(search, 500);

  useEffect(() => {
    handleSearchOrder(searchKey)
  }, [searchKey])
    
  const handleSearchOrder = async (keyword) => {
    setLoading(true);
    setOrders(null);

    try {
      let data;
      if (keyword != "") {
        data = await GetOrderByNumber(token, keyword);
        setOrders(data);
      }else{
        data = await AllOrder(token);
        setOrders(data.data);
      }
    } catch (error) {
      setOrders(null);
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
          <Appbar.Content title="Order" color='white' />
          <Appbar.Action icon="plus" color='white' onPress={() => console.log("add order")} />
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
          placeholder="Nomor Order"
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
          orders
            ? orders.map((data) => {
              return (
                <TouchableOpacity
                  key={data.ID}
                  style={{
                    width: '100%',
                    paddingVertical: 20,
                    paddingHorizontal: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: "#f0f0f0",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                  // onPress={() => {
                  //   let order = {
                  //     id: data.ID,
                  //     order_number: data.order_number,
                  //     customer_id: data.customer_id,
                  //     customer_name: data.customer.name,
                  //     discount: data.discount,
                  //     subtotal: data.subtotal,
                  //     details: JSON.stringify(data.details)
                  //   };
                  //   router.push({pathname: '/pages/order/detail', params: order})
                  // }}
                >
                  <View>
                    <Text style={{fontWeight: "500"}}>{data.order_number}</Text>
                    <Text>{"Oleh : " + data.customer.name}</Text>
                  </View>
                  <Text style={{fontSize: 15, fontWeight: "500"}}>
                    {toRupiah(data.subtotal-data.discount, { dot: '.', floatingPoint: 0 })}
                  </Text>
                </TouchableOpacity>
                )
            })
            : (
              <Text
                style={{
                textAlign: "center",
                marginTop: 30
                }}
              >{loading ? "Load orders...." : "Order not available"}</Text>
            )
        }
      </ScrollView>
    </View>
  )
}