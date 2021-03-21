import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import WebView, { WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';

const COLORS = {
  primary: '#ad3636',
  secondary: '#faf2de',
};

const USER_AGENT = 'skole-native-app';

const SOURCE = {
  uri: 'https://www.skoleapp.com',
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 20,
  },
  header: {
    color: COLORS.secondary,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    color: COLORS.secondary,
    textAlign: 'center',
  },
  tryAgainButton: {
    marginTop: 20,
    padding: 10,
  },
  tryAgainText: {
    color: COLORS.secondary,
  },
});

export const App: React.FC = () => {
  const webViewRef = useRef<WebView>(null);
  const backAction = (): void => webViewRef.current?.goBack();
  const handleTryAgainButtonPress = (): void => webViewRef.current?.reload();

  const handleNotificationOpened = ({ data }: FirebaseMessagingTypes.RemoteMessage): void =>
    webViewRef.current?.postMessage(JSON.stringify({ key: 'NOTIFICATION_OPENED', data }));

  useEffect(() => {
    RNBootSplash.hide({ fade: true }); // https://github.com/zoontek/react-native-bootsplash#usage

    // Request push notification permission on iOS: https://rnfirebase.io/messaging/usage#ios---requesting-permissions
    messaging().requestPermission();

    // Tell web app which view should be opened.
    messaging().onNotificationOpenedApp(handleNotificationOpened);

    // @ts-ignore: `BackHandler` expects `boolean | void | null` type for the event handler return type.
    BackHandler.addEventListener('hardwareBackPress', backAction);

    // @ts-ignore: Same as above.
    return (): void => BackHandler.removeEventListener('hardwareBackPress', backAction);
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

  const renderLoading = () => (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.secondary} />
    </SafeAreaView>
  );

  const renderError = () => (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Offline</Text>
      <Text style={styles.text}>
        Make sure you have a valid internet connection and try again in a moment.
      </Text>
      <TouchableOpacity style={styles.tryAgainButton} onPress={handleTryAgainButtonPress}>
        <Text style={styles.tryAgainText}>Try Again</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  return (
    <WebView
      ref={webViewRef}
      userAgent={USER_AGENT}
      source={SOURCE}
      allowsBackForwardNavigationGestures // Enable back/forward gestures on iOS.
      decelerationRate="normal" // Enable smooth scrolling on iOS.
      onNavigationStateChange={handleNavigationStateChange}
      onMessage={handleMessage}
      startInLoadingState
      renderLoading={renderLoading}
      renderError={renderError}
    />
  );
};
