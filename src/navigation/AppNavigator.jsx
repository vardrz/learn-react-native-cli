import React from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../contexts/AuthContext";
// screen
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import HomeScreen from "../screens/HomeScreen";
// order
import OrderScreen from "../screens/order";
import AddOrder from "../screens/order/add";
import DetailOrder from "../screens/order/detail";
import EditOrder from "../screens/order/edit";
// customer
import CustomerScreen from "../screens/customer";
import DetailCustomer from "../screens/customer/detail";
import AddCustomer from "../screens/customer/add";
import EditCustomer from "../screens/customer/edit";
// product
import ProductScreen from "../screens/product";
import AddProduct from "../screens/product/add";
import DetailProduct from "../screens/product/detail";
import EditProduct from "../screens/product/edit";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          else if(route.name === "Order") iconName = "cart-outline";
          else if(route.name === "Customer") iconName = "people-outline";
          else if(route.name === "Produk") iconName = "cube-outline";

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 60 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="Customer" component={CustomerScreen} />
      <Tab.Screen name="Produk" component={ProductScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const navigationRef = useNavigationContainerRef();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "700",
            marginBottom: 20,
            color: "blue"
          }}
        >Open App</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={BottomTabNavigator} />
            
            <Stack.Screen name="AddOrder" component={AddOrder} />
            <Stack.Screen name="DetailOrder" component={DetailOrder} />
            <Stack.Screen name="EditOrder" component={EditOrder} />

            <Stack.Screen name="AddCustomer" component={AddCustomer} />
            <Stack.Screen name="DetailCustomer" component={DetailCustomer} />
            <Stack.Screen name="EditCustomer" component={EditCustomer} />

            <Stack.Screen name="AddProduct" component={AddProduct} />
            <Stack.Screen name="DetailProduct" component={DetailProduct} />
            <Stack.Screen name="EditProduct" component={EditProduct} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});