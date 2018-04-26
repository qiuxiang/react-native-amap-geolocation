# react-native-amap-geolocation [![npm version][version-badge]][npm]

React Native geolocation module for Android + iOS.

## Install
```shell
npm i react-native-amap-geolocation
```

### Android
```shell
react-native link react-native-amap-geolocation
```

### iOS
Setup your `Podfile` in the `ios` folder:
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
See also: https://facebook.github.io/react-native/docs/0.53/integration-with-existing-apps.html

Then:
```shell
pod install
```


## Usage
```javascript
import { Geolocation } from "react-native-amap-geolocation"

await Geolocation.init({
  ios: "9bd6c82e77583020a73ef1af59d0c759",
  android: "043b24fe18785f33c491705ffe5b6935"
})
Geolocation.setOptions({
  interval: 8000,
  distanceFilter: 20,
})
Geolocation.addLocationListener(location => console.log(location))
Geolocation.start()
```

[npm]: https://www.npmjs.com/package/react-native-amap-geolocation
[version-badge]: https://badge.fury.io/js/react-native-amap-geolocation.svg
