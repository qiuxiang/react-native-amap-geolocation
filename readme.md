# 快速上手

## 获取高德 App Key

为了使用高德 SDK，你需要准备高德 App Key，获取方法参考高德地图 SDK 官方文档：

- [获取 Android App Key](https://lbs.amap.com/api/android-location-sdk/guide/create-project/get-key)
- [获取 iOS App Key](https://lbs.amap.com/api/ios-location-sdk/guide/create-project/get-key)

## 安装

```
npm i react-native-amap-geolocation
```

## 基本用法

```javascript
import { PermissionsAndroid } from "react-native";
import { init, Geolocation } from "react-native-amap-geolocation";

// 对于 Android 需要自行根据需要申请权限
await PermissionsAndroid.requestMultiple([
  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
]);

// 使用自己申请的高德 App Key 进行初始化
await init({
  ios: "9bd6c82e77583020a73ef1af59d0c759",
  android: "043b24fe18785f33c491705ffe5b6935",
});

Geolocation.getCurrentPosition(({ coords }) => {
  console.log(coords);
});
```

# 更多用法

该项目除了提供符合 Web 标准的 Geolocation API，同时为了最大程度的发挥高德定位 SDK 的功能，
会尽可能提供与原生 SDK 一致的接口封装。由于 iOS 和 Android SDK 提供的接口并不一致，
于是最终实现的接口大部分是并不通用的。这在接口文档或文档注释有注明，
比如 `@platform android` 表示该接口仅用于 Android。

以下是一些常用接口的用法说明以及示例代码，更多接口的具体用法请参考[接口文档]()。

## 直接使用原生接口

```javascript
import { init, addLocationListener, start, stop } from "react-native-amap-geolocation";

// 添加定位监听函数
addLocationListener((location) => console.log(location));

// 开始连续定位
start();

// 在不需要的时候停止定位
stop();
```

## 逆地理编码

Android 默认返回逆地理编码，而 iOS 需要手动设置。

```javascript
import { setLocatingWithReGeocode, setNeedAddress } from "react-native-amap-geolocation";

// android
setNeedAddress(true);

// ios
setLocatingWithReGeocode(true);
```

## 定位回调频率限制

```javascript
import { setInterval, setDistanceFilter } from "react-native-amap-geolocation";

// android，5 秒请求一次定位
setInterval(5000);

// ios，设备移动超过 10 米才会更新位置信息
setDistanceFilter(10);
```
