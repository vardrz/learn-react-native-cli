import React, { createContext, useContext, useState, useEffect } from "react";
import EncryptedStorage from "react-native-encrypted-storage";
import api from "../constants/api";
import { Snackbar } from "react-native-paper";
import { Text } from "react-native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
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

      if (response.ok) {
        await EncryptedStorage.setItem("user", JSON.stringify(data.data));
        await EncryptedStorage.setItem("token", data.token);

        setUser(data.data);
        setToken(data.token);
        
        navigation.navigate('Main', {screen: "Home"})
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async (navigation) => {
    await EncryptedStorage.removeItem("user");
    await EncryptedStorage.removeItem("token");

    setUser(null);
    setToken(null);
    navigation.navigate('Login')
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading, setShowSnackbar, setSnackbarMsg }}>
      {children}
      
      {/* snackbar */}
      <Snackbar
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