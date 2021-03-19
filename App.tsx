import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import React, { useEffect, useRef } from 'react';
import { BackHandler, Linking } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import WebView, { WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';

const USER_AGENT = 'skole-native-app';

const SOURCE = {
  uri: 'https://www.skoleapp.com',
};

export const App: React.FC = () => {
  const webViewRef = useRef<WebView>(null);
  const backAction = (): void => webViewRef.current?.goBack();

  const handleNotificationOpened = ({ data }: FirebaseMessagingTypes.RemoteMessage): void =>
    webViewRef.current?.postMessage(JSON.stringify({ key: 'NOTIFICATION_OPENED', data }));

  useEffect(() => {
    SplashScreen.hide(); // https://github.com/crazycodeboy/react-native-splash-screen#usage

    // Request push notification permission on iOS: https://rnfirebase.io/messaging/usage#ios---requesting-permissions
    messaging().requestPermission();

    // Tell web app which view should be opened.
    messaging().onNotificationOpenedApp(handleNotificationOpened);

    // @ts-ignore: `BackHandler` expects `boolean | void | null` type for the event handler return type.
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return (): void => backHandler.remove();
  }, []);

  // Prevent opening the blogs in the app and open them externally in the browser instead.
  const handleNavigationStateChange = ({ url }: WebViewNavigation): void => {
    if (url.includes('blogs')) {
      webViewRef.current?.goBack();
      Linking.openURL(url);
    }
  };

  const handleMessage = async ({ nativeEvent: { data } }: WebViewMessageEvent): Promise<void> => {
    if (data === 'GET_FCM_TOKEN') {
      const token = await messaging().getToken();
      webViewRef.current?.postMessage(JSON.stringify({ key: 'REGISTER_FCM_TOKEN', token }));
    }
  };

  return (
    <WebView
      ref={webViewRef}
      userAgent={USER_AGENT}
      source={SOURCE}
      allowsBackForwardNavigationGestures // Enable back/forward gestures on iOS.
      decelerationRate="normal" // Enable smooth scrolling on iOS.
      onNavigationStateChange={handleNavigationStateChange}
      onMessage={handleMessage}
    />
  );
};
