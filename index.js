/**
 * @format
 */

import {AppRegistry, Appearance} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';
import notifee from '@notifee/react-native';

const messaging = getMessaging(getApp());

setBackgroundMessageHandler(messaging, async (remoteMessage) => {
    if (remoteMessage.data) {
        await notifee.displayNotification({
            title: remoteMessage.data.title,
            body: remoteMessage.data.body,
            android: {
                channelId: 'default',
            },
        });
    }

    console.log("Background Notification!", remoteMessage.data);
    return;
});

AppRegistry.registerComponent(appName, () => App);
Appearance.setColorScheme("dark");
