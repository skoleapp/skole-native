import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Platform,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { WebViewProgressEvent } from 'react-native-webview/lib/WebViewTypes';

const COLORS = {
  primary: '#ad3636',
  secondary: '#faf2de',
};

const USER_AGENT = 'skole-native-app';

const SOURCE = {
  uri: 'https://www.skoleapp.com',
};

type RemoteMessage = FirebaseMessagingTypes.RemoteMessage;

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
  const [webViewLoaded, setWebViewLoaded] = useState(false);
  const backAction = (): void => webViewRef.current?.goBack();
  const handleTryAgainButtonPress = (): void => webViewRef.current?.reload();

  const handleNotificationOpened = ({ data }: RemoteMessage): void =>
    webViewRef.current?.postMessage(JSON.stringify({ key: 'NOTIFICATION_OPENED', data }));

  const handleLoadProgress = (e: WebViewProgressEvent): void => {
    if (e.nativeEvent.progress === 1) {
      setWebViewLoaded(true);
    }
  };

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

  // When opening app from quit state by clicking a notification, wait until the webview has loaded.
  useEffect(() => {
    (async () => {
      if (webViewLoaded) {
        const message = await messaging().getInitialNotification();

        if (message) {
          handleNotificationOpened(message);
        }
      }
    })();
  }, [webViewLoaded]);

  const handleMessage = async ({ nativeEvent: { data } }: WebViewMessageEvent): Promise<void> => {
    try {
      const { key, payload } = JSON.parse(data);

      if (key === 'SHARE') {
        if (Platform.OS === 'android') {
          await Share.share(payload);
        }
      }
    } catch {
      // Data was not JSON.

      if (data === 'GET_FCM_TOKEN') {
        const token = await messaging().getToken();
        webViewRef.current?.postMessage(JSON.stringify({ key: 'REGISTER_FCM_TOKEN', token }));
      }
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
      onMessage={handleMessage}
      onLoadProgress={handleLoadProgress}
      startInLoadingState
      renderLoading={renderLoading}
      renderError={renderError}
    />
  );
};
