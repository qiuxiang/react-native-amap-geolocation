# react-native-amap-geolocation [![npm version][version-badge]][npm] [![build status][build-badge]][build]

React Native 高德地图定位模块，支持 Android + iOS。

## 安装
```shell
npm i react-native-amap-geolocation
```

### Android
```shell
react-native link react-native-amap-geolocation
```

### iOS
为了简化配置过程，暂时只提供 CocoaPods 支持。

在 `ios` 目录下新建文件 `Podfile`：
```ruby
platform :ios, '8.0'

# The target name is most likely the name of your project.
target 'Your Target' do

  # Your 'node_modules' directory is probably in the root of your project,
  # but if not, adjust the `:path` accordingly
  pod 'React', :path => '../node_modules/react-native', :subspecs => [
    'Core',
    'CxxBridge', # Include this for RN >= 0.47
    'DevSupport', # Include this to enable In-App Devmenu if RN >= 0.43
    'RCTText',
    'RCTNetwork',
    'RCTWebSocket', # Needed for debugging
    'RCTAnimation', # Needed for FlatList and animations running on native UI thread
    # Add any other subspecs you want to use in your project
  ]
  # Explicitly include Yoga if you are using RN >= 0.42.0
  pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'

  # Third party deps podspec link
  pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
  pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/glog.podspec'
  pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'

  pod 'react-native-amap-geolocation', path: '../node_modules/react-native-amap-geolocation/lib/ios'
end
```
*以上配置针对 RN v0.55，v0.53 及其他版本请参考: https://facebook.github.io/react-native/docs/0.53/integration-with-existing-apps.html*

然后运行：
```shell
pod install
```


## 用法
```javascript
import { Geolocation } from "react-native-amap-geolocation"

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
```


## 接口文档
### Geolocation
#### `init({ ios: string, android: string }): Promise<void>`
初始化并申请权限，必须在调用其他方法前调用

#### `setOptions(options: Options)`
设置定位参数

```javascript
type Options = {
  /**
   * 最小更新距离
   *
   * 参考：https://bit.ly/2vPTXY7
   */
  distanceFilter: number,

  /**
   * 定位请求间隔
   *
   * 参考：https://bit.ly/2KhmCbu
   */
  interval: number,
}
```

#### `start()`
开始定位

#### `stop()`
停止定位

#### `addLocationListener(Location => void): EventSubscription`
添加定位监听函数

```javascript
type Location = {
  accuracy: number,  // 精度
  latitude: number,  // 经度
  longitude: number, // 纬度
  altitude: number,  // 海拔 (m)
  speed: number,     // 速度 (m/s)，GPS only
  direction: number, // 行进方向，GPS only
  timestamp: number, // 定位时间戳
}
```

#### `getLastLocation(): Promise<Location>`
获取最近一次定位结果

## 实例
你可以直接下载安装 [example.apk](https://github.com/qiuxiang/react-native-amap-geolocation/releases/download/v0.1.0/example.apk)。

### Android
```shell
yarn run-android
```

### iOS
```shell
cd ios && pod install && cd ..
yarn run-ios
```


[npm]: https://www.npmjs.com/package/react-native-amap-geolocation
[version-badge]: https://badge.fury.io/js/react-native-amap-geolocation.svg
[build-badge]: https://travis-ci.org/qiuxiang/react-native-amap-geolocation.svg?branch=master
[build]: https://travis-ci.org/qiuxiang/react-native-amap-geolocation
