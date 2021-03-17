# Skole Native Dependencies

This document explains the need for every top level dependency the project has.

## NPM

### Prod Requirements

| Dependency                                                                                         | Reason                             |
| :------------------------------------------------------------------------------------------------- | :--------------------------------- |
| [@react-native-firebase/app](https://www.npmjs.com/package/@react-native-firebase/app)             | Firebase integration.              |
| [@react-native-firebase/messaging](https://www.npmjs.com/package/@react-native-firebase/messaging) | Firebase Cloud Messaging (FCM).    |
| [react](https://www.npmjs.com/package/react)                                                       | Duh.                               |
| [react-native](https://www.npmjs.com/package/react-native)                                         | Duh.                               |
| [react-native-webview](https://www.npmjs.com/package/react-native-webview)                         | Embed website into the native app. |

### Dev Requirements (excluding plugins and TypeScript typings)

| Dependency                                                               | Reason                            |
| :----------------------------------------------------------------------- | :-------------------------------- |
| [@babel/core](https://www.npmjs.com/package/@babel/core)                 | API for transpiling code.         |
| [@babel/runtime](https://www.npmjs.com/package/@babel/core)              | Runtime for Babel.                |
| [eslint](https://www.npmjs.com/package/eslint)                           | Linter.                           |
| [jest](https://www.npmjs.com/package/jest)                               | Test runner.                      |
| [react-test-renderer](https://www.npmjs.com/package/react-test-renderer) | Render react components in tests. |
| [typescript](https://www.npmjs.com/package/typescript)                   | Duh.                              |
