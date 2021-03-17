# Skole Native 🎓

[![circleci status](https://circleci.com/gh/skoleapp/skole-native.svg?style=shield&circle-token=b273aae562b2e86f3a03ff1d45a3c840fec13f02)](https://circleci.com/gh/skoleapp/skole-native)
[![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label&color=007acc)](https://www.typescriptlang.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

This is the native app for the Skole.

Also check out the [README from `skole` repo](https://github.com/skoleapp/skole/blob/develop/README.md).

See detailed description for all top-level dependencies in [`dependencies.md`](dependencies.md) file.

Other useful documentation:

- [React Native docs](https://reactnative.dev/docs/getting-started)
- [React docs](https://reactjs.org/docs/getting-started.html)

## Requirements

- [Xcode](https://developer.apple.com/xcode/) (iOS)
- [Android Studio](https://developer.android.com/studio) (Android)
- [CocoaPods](https://cocoapods.org) (iOS)
- [JDK](https://www.oracle.com/java/technologies/javase-downloads.html) (Android)
- [Watchman](https://www.oracle.com/java/technologies/javase-downloads.html)

## What's inside? 🧐

A quick look at the top-level files and directories excluding Git ignored locations.

1.  [**`__test__`**](__tests__): Tests.
2.  [**`.circleci/`**](.circleci/): Configuration for [CircleCI](https://circleci.com).
3.  [**`.github/`**](.github/): Configuration for [Github Actions](https://github.com/features/actions).
4.  [**`.gradle/`**](.gradle/): [Gradle](https://gradle.org) configuration.
5.  [**`.vscode/`**](.vscode/): [VSCode](https://code.visualstudio.com) configuration.
6.  [**`android/`**](android/): [Android Studio](https://developer.android.com/studio) project.
7.  [**`ios/`**](ios/): [XCode](https://developer.apple.com/xcode) project.
8.  [**`.buckconfig`**](.buckconfig): [Buck](https://buck.build).
9.  [**`.eslintrc.json`**](.eslintrc.json): ESLint configuration.
10. [**`.gitattributes`**](.gitattributes): Additional Git [repo metadata](https://git-scm.com/docs/gitattributes).
11. [**`.gitignore`**](.gitignore): List of files ignored by [Git](https://git-scm.com).
12. [**`.prettierrc.json`**](.prettierrc.json): [Prettier](https://prettier.io) configuration.
13. [**`.watchmanconfig`**](.watchmanconfig): [Watchman](https://facebook.github.io/watchman) configuration.
14. [**`app.json`**](app.json): Configuration for the native app.
15. [**`App.tsx`**](App.tsx): Top-level component for the RN app.
16. [**`babel.config.js`**](babel.config.js): [Babel](https://babeljs.io) configuration.
17. [**`dependencies.md`**](dependencies.md): Documentation for top-level dependencies.
18. [**`index.js`**](index.js): Entry point/root for the RN app.
19. [**`metro.config.js`**](metro.config.js): [Metro](https://facebook.github.io/metro) configuration.
20. [**`package.json`**](package.json): Manifest file for [Node.js](https://nodejs.org/en).
21. [**`README.md`**](README.md): The file you're reading.
22. [**`tsconfig.json`**](tsconfig.json): TypeScript configuration.
23. [**`yarn.lock`**](yarn.lock): Auto-generated file for locking version numbers of all dependencies listed in `package.json`.

## Development Tips 🚀

- When developing with Android emulator locally, use `10.0.2.2` instead of `localhost` in the webview source URL. Do the same also for the `API_URL` environment variable in the [`skole` repo](https://github.com/skoleapp/skole)
