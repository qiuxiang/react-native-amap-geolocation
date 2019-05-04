# 快速上手

## 获取高德 App Key

为了使用高德 SDK，你需要准备高德 App Key，获取方法参考高德地图 SDK 官方文档：

- [获取 Android App Key](https://lbs.amap.com/api/android-location-sdk/guide/create-project/get-key)
- [获取 iOS App Key](https://lbs.amap.com/api/ios-location-sdk/guide/create-project/get-key)

## 安装

```
yarn add react-native-amap-geolocation
```

或使用 npm：

```
npm i react-native-amap-geolocation
```

## 自动配置（推荐）

```
react-native link react-native-amap-geolocation
```

## 手动配置

一般情况下 react-native link 即可完成配置，如果因特殊原因无法使用 react-native link
或 link 失败，则可参照以下步骤检查并进行手动配置。

### Android

1. 编辑 `android/settings.gradle`，设置项目路径：

   ```diff
   include ':react-native-amap-geolocation'
   + project(':react-native-amap-geolocation').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-amap-geolocation/lib/android')
   ```

2. 编辑 `android/app/build.gradle`，新增依赖：

   ```diff
   dependencies {
   +   implementation project(':rongcloud-react-native-imlib')
   }
   ```

3. 编辑 `MainApplication.java`：

   ```diff
   + import cn.qiuxiang.react.geolocation.AMapGeolocationPackage;

   public class MainApplication extends Application implements ReactApplication {
     @Override
     protected List<ReactPackage> getPackages() {
       return Arrays.asList(
         new MainReactPackage(),
   +       new AMapGeolocationPackage()
       );
     }
   }
   ```

### iOS

1. Project navigator ➜ 右击 Libraries ➜ 选择 `Add Files to "XXXX"...`

2. 选择并添加 `node_modules/react-native-amap-geolocation/lib/ios/AMapGeolocation.xcodeproj`
   （或从文件浏览器里将该文件拖拽到 Libraries）

3. Build Phases ➜ Link Binary With Libraries 中选择并添加 libAMapGeolocation.a

## iOS 项目的额外配置

对于 iOS 项目无论如何还要手动下载 SDK 并进行一些必要的配置，也可以参考官方文档：
[手动部署](https://lbs.amap.com/api/ios-location-sdk/guide/create-project/manual-configuration)。

### 下载 iOS SDK

1. 从官方网站下载 [基础 SDK（含 IDFA）](https://a.amap.com/lbs/static/zip/AMap_iOS_Foundation_Lib_V1.4.3.zip)
   和 [定位 SDK](https://a.amap.com/lbs/static/zip/AMap_iOS_Loc_Lib_V2.6.2.zip) 并解压到 `ios/`。

2. 将解压得到的 `AMapFoundationKit.framework` 和 `AMapLocationKit.framework` 以及
   `ExternalAccessory.framework` 添加到 Build Phases ➜ Link Binary With Libraries。

### 添加权限申请

在 iOS 项目的 Info.plist 添加定位权限申请。

## 基本用法

```javascript
import { PermissionsAndroid } from "react-native";
import { init, Geolocation } from "react-native-amap-geolocation";

// 对于 Android 需要自行根据需要申请权限
await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);

// 使用自己申请的高德 App Key 进行初始化
await init({
  ios: "9bd6c82e77583020a73ef1af59d0c759",
  android: "043b24fe18785f33c491705ffe5b6935"
});

const { coords } = await Geolocation.getCurrentPosition();
```

# 更多用法

该项目除了提供符合 Web 标准的 Geolocation API，同时为了最大程度的发挥高德定位 SDK 的功能，
会尽可能提供和原生 SDK 尽可能一致的接口封装。由于 iOS 和 Android SDK 提供的接口并不一致，
于是最终实现的接口大部分是并不通用的。这在接口文档或文档注释有注明，
比如 `@platform android` 表示该接口仅用于 Android。

以下是一些常用接口的用法说明以及示例代码，更多接口的具体用法请参考[接口文档]()。

## 直接使用原生接口

```javascript
import { init, addLocationListener, start, stop } from "react-native-amap-geolocation";

// 添加定位监听函数
addLocationListener(location => console.log(location));

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
