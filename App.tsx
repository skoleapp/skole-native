import React from 'react';
import WebView from 'react-native-webview';

export const App = () => (
  <WebView
    userAgent="skole-native-app"
    source={{ uri: 'https://www.skoleapp.com' }}
    allowsBackForwardNavigationGestures
    pullToRefreshEnabled
  />
);
