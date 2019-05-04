# react-native-amap-geolocation [![npm version][version-badge]][npm] [![build status][build-badge]][build]

React Native 高德地图定位模块，支持 Android + iOS。

## 用法

```javascript
import { PermissionsAndroid } from "react-native";
import { init, Geolocation } from "react-native-amap-geolocation";

await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);

await init({
  ios: "9bd6c82e77583020a73ef1af59d0c759",
  android: "043b24fe18785f33c491705ffe5b6935"
});

const { coords } = await Geolocation.getCurrentPosition();
```

[npm]: https://www.npmjs.com/package/react-native-amap-geolocation
[version-badge]: https://badge.fury.io/js/react-native-amap-geolocation.svg
[build-badge]: https://travis-ci.org/qiuxiang/react-native-amap-geolocation.svg?branch=master
[build]: https://travis-ci.org/qiuxiang/react-native-amap-geolocation
