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