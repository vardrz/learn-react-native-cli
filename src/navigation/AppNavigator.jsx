import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../contexts/AuthContext";

import LoginScreen from "../screens/Login";
import HomeScreen from "../screens/HomeScreen";

import OrderScreen from "../screens/OrderScreen";
import AddOrder from "../screens/order/add";
import DetailOrder from "../screens/order/detail";
import EditOrder from "../screens/order/edit";

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
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const navigationRef = useNavigationContainerRef();
  const { user } = useAuth();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={BottomTabNavigator} />
            
            <Stack.Screen name="AddOrder" component={AddOrder} />
            <Stack.Screen name="DetailOrder" component={DetailOrder} />
            <Stack.Screen name="EditOrder" component={EditOrder} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
