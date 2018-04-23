# react-native-amap-geolocation [![npm version][version-badge]][npm]

React Native geolocation module for Android + iOS.

## Install
```shell
npm i react-native-amap-geolocation
react-native link react-native-amap-geolocation
```

## Usage
```javascript
import { Geolocation } from "react-native-amap-geolocation"

await Geolocation.init("043b24fe18785f33c491705ffe5b6935")
Geolocation.setOptions({ interval: 2000 })
Geolocation.addLocationListener(location => console.log(location))
Geolocation.start()
```

[npm]: https://www.npmjs.com/package/react-native-amap-geolocation
[version-badge]: https://badge.fury.io/js/react-native-amap-geolocation.svg
