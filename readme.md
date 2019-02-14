# react-native-amap-geolocation [![npm version][version-badge]][npm] [![build status][build-badge]][build]

React Native 高德地图定位模块，支持 Android + iOS。

<img src="https://user-images.githubusercontent.com/1709072/39578441-c39bd3f0-4f16-11e8-83e5-99badbd68473.png" width=300>

## 使用

1.  [安装](docs/installation.md)
2.  获取 Key：
    * [Android](http://lbs.amap.com/api/android-location-sdk/guide/create-project/get-key)
    * [iOS](http://lbs.amap.com/api/ios-location-sdk/guide/create-project/get-key)

```javascript
import { PermissionsAndroid } from "react-native"
import { Geolocation } from "react-native-amap-geolocation"

const granted = await PermissionsAndroid.request(
  PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
);

if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  await Geolocation.init({
    ios: "9bd6c82e77583020a73ef1af59d0c759",
    android: "043b24fe18785f33c491705ffe5b6935"
  })

  Geolocation.setOptions({
    interval: 8000,
    distanceFilter: 20
  })

  Geolocation.addLocationListener(location => console.log(location))
  Geolocation.start()
}
```

## 文档

* [Geolocation](docs/geolocation.md)

## 示例

你可以直接下载安装 [example.apk](https://github.com/qiuxiang/react-native-amap-geolocation/releases/download/v0.3.0/example.apk)，或者按照以下步骤运行项目示例：

```shell
yarn

# android
yarn run-android

# ios
cd ios && pod install && cd ..
yarn run-ios
```

[npm]: https://www.npmjs.com/package/react-native-amap-geolocation
[version-badge]: https://badge.fury.io/js/react-native-amap-geolocation.svg
[build-badge]: https://travis-ci.org/qiuxiang/react-native-amap-geolocation.svg?branch=master
[build]: https://travis-ci.org/qiuxiang/react-native-amap-geolocation
