/**
 * @format
 */

import {AppRegistry, Appearance} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';

const messaging = getMessaging(getApp());

setBackgroundMessageHandler(messaging, async (remoteMessage) => {
    console.log("Background Notification!", JSON.stringify(remoteMessage));
});

// onMessage(messaging, async (remoteMessage) => {
//     console.log(remoteMessage.notification.body ?? "ada notif");
//     Alert(remoteMessage.notification.body ?? "ada notif");
// });

AppRegistry.registerComponent(appName, () => App);
Appearance.setColorScheme("dark");
