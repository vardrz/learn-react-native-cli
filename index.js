/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { getMessaging, onMessage, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';

const messaging = getMessaging(getApp());

setBackgroundMessageHandler(messaging, async (remoteMessage) => {
    console.log("Background Notification!", JSON.stringify(remoteMessage));
});

onMessage(messaging, async (remoteMessage) => {
    console.log("New Notification!", JSON.stringify(remoteMessage));
});

AppRegistry.registerComponent(appName, () => App);
