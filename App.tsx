import React, { useRef } from 'react';
import { Linking } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';

const USER_AGENT = 'skole-native-app';

const SOURCE = {
  uri: 'https://www.skoleapp.com',
};

export const App = () => {
  const webviewRef = useRef<WebView>(null);

  // Prevent opening the blogs in the app and open them externally in the browser instead.
  const handleNavigationStateChange = ({ url }: WebViewNavigation) => {
    if (url.includes('blogs')) {
      webviewRef.current?.goBack();
      Linking.openURL(url);
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
    />
  );
};
