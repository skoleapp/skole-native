import React, { useEffect, useRef } from 'react';
import { Linking } from 'react-native';
import WebView, { WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

const USER_AGENT = 'skole-native-app';

const SOURCE = {
  uri: 'https://www.skoleapp.com',
};

export const App: React.FC = () => {
  const webviewRef = useRef<WebView>(null);

  const registerFCMToken = (token: string): void =>
    webviewRef.current?.postMessage(JSON.stringify({ key: 'REGISTER_FCM_TOKEN', token }));

  const handleNotificationOpened = ({ data }: FirebaseMessagingTypes.RemoteMessage): void =>
    webviewRef.current?.postMessage(JSON.stringify({ key: 'NOTIFICATION_OPENED', data }));

  useEffect(() => {
    // Request push notification permission on iOS: https://rnfirebase.io/messaging/usage#ios---requesting-permissions
    messaging().requestPermission();

    // Tell web app which view should be opened.
    messaging().onNotificationOpenedApp(handleNotificationOpened);
  }, []);

  // Prevent opening the blogs in the app and open them externally in the browser instead.
  const handleNavigationStateChange = ({ url }: WebViewNavigation): void => {
    if (url.includes('blogs')) {
      webviewRef.current?.goBack();
      Linking.openURL(url);
    }
  };

  const handleMessage = ({ nativeEvent: { data } }: WebViewMessageEvent): void => {
    if (data === 'GET_FCM_TOKEN') {
      messaging().getToken().then(registerFCMToken);
    }
  };

  return (
    <WebView
      ref={webviewRef}
      userAgent={USER_AGENT}
      source={SOURCE}
      allowsBackForwardNavigationGestures
      pullToRefreshEnabled // TODO: Remove this when we have a better pull to refresh enabled in the web app.
      decelerationRate="normal" // Enable smooth scrolling on iOS.
      onNavigationStateChange={handleNavigationStateChange}
      onMessage={handleMessage}
    />
  );
};
