import React, { createContext, useContext, useState, useEffect } from "react";
import EncryptedStorage from "react-native-encrypted-storage";
import api from "../constants/api";
import { Snackbar } from "react-native-paper";
import { Text } from "react-native";
import { getMessaging, onMessage, subscribeToTopic, unsubscribeFromTopic } from "@react-native-firebase/messaging";
import { getApp } from "@react-native-firebase/app";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  
  // for snackbar
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await EncryptedStorage.getItem("user");
        const storedToken = await EncryptedStorage.getItem("token");
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }        
        
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password, navigation) => {
    try {
      const response = await fetch(api.url + "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      const subsUserTopic = async (topic) => {
        try {
          const messaging = getMessaging(getApp());
          await subscribeToTopic(messaging, topic)
          console.log(`Subs Topic : ${topic}`);
        } catch (error) {
          console.error(`Failed subs topic : ${topic}`);
        }
      };

      if (response.ok) {
        // save user data & jwt token
        await EncryptedStorage.setItem("user", JSON.stringify(data.data));
        await EncryptedStorage.setItem("token", data.token);
        setUser(data.data);
        setToken(data.token);

        // subs topic by user nickname
        subsUserTopic(data.data.nickname);
        
        navigation.navigate('Main', {screen: "Home"})
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async (navigation) => {
    const unsubsUserTopic = async (topic) => {
      try {
        const messaging = getMessaging(getApp());
        await unsubscribeFromTopic(messaging, topic)
        console.log(`Unsubscribe Topic : ${topic}`);
      } catch (error) {
        console.error(`Failed unsubscribe topic : ${topic}`);
      }
    };
    unsubsUserTopic(user.nickname);
    
    await EncryptedStorage.removeItem("user");
    await EncryptedStorage.removeItem("token");
    
    setUser(null);
    setToken(null);
    navigation.navigate('Login')
  };

  
  // handle notif
  useEffect(() => {
    const messaging = getMessaging(getApp());
    const unsubscribe = onMessage(messaging, async (remoteMessage) => {
      setNotification(remoteMessage.notification);
    });

    return unsubscribe;
  }, []);
  
  useEffect(() => {
    if (notification) {
      setShowSnackbar(true);
      setSnackbarMsg(notification.title + ":\n" + notification.body);
    }

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }, [notification]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading, setShowSnackbar, setSnackbarMsg }}>
      {children}
      
      {/* snackbar */}
      <Snackbar
        wrapperStyle={notification ? { top: 20 } : {}}
        style={{
          backgroundColor: "black",
          borderRadius: 15
        }}
        visible={showSnackbar}
        duration={3000}
        onDismiss={() => setShowSnackbar(false)}
        action={{
          label: 'OK',
          onPress: () => setShowSnackbar(false),
        }}
      ><Text style={{color: "white"}}>{snackbarMsg}</Text></Snackbar>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);