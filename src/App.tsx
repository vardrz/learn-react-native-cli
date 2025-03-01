import AppNavigator from "./navigation/AppNavigator";
import { AuthProvider } from "./contexts/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from 'react';
import { getMessaging, requestPermission, subscribeToTopic } from "@react-native-firebase/messaging";
import { getApp } from "@react-native-firebase/app";
import { PermissionsAndroid, Platform } from "react-native";
import { PaperProvider, MD3DarkTheme } from "react-native-paper";
import notifee, { AndroidImportance } from "@notifee/react-native";

export default function App() {
  useEffect(() => {
    const requestUserPermission = async () => {
      try {
        const messaging = getMessaging(getApp());
        const authStatus = await requestPermission(messaging);

        console.log("Notif Permission Status : ", authStatus);
      } catch (error) {
        console.error("Error requesting permission:", error);
      }
    };

    const subsGlobalTopic = async () => {
      try {
        const messaging = getMessaging(getApp());
        await subscribeToTopic(messaging, "global")
        console.log("Subs Topic : global");
      } catch (error) {
        console.error("Failed subs topic : global");
      }
    };

    const notifeeCreateChannel = async () => {
      try {
        await notifee.createChannel({
          id: 'default',
          name: 'Default Notification',
          // lights: false,
          vibration: true,
          importance: AndroidImportance.HIGH,
        });
      } catch (error) {
        console.error("Failed create notifee channel");
      }
    };

    requestAndroidNotificationPermission();
    requestUserPermission();
    subsGlobalTopic();
    notifeeCreateChannel();
  }, []);

  const requestAndroidNotificationPermission = async () => {
    if (Platform.OS === "android" && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Android 13 Notification permission granted!");
      } else {
        console.log("Android 13 Notification permission denied!");
      }
    }
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={MD3DarkTheme}>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}