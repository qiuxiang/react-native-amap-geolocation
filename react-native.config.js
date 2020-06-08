module.exports = {
  dependency: {
    platforms: {
      ios: { project: "lib/ios/react-native-amap-geolocation.podspec" },
      android: { sourceDir: "lib/android" }
    }
  },
  dependencies: {
    "react-native-amap-geolocation": {
      root: __dirname,
      platforms: {
        ios: { podspecPath: __dirname + "/lib/ios/react-native-amap-geolocation.podspec" },
        android: {
          sourceDir: __dirname + "/lib/android",
          packageImportPath: "import cn.qiuxiang.react.geolocation.AMapGeolocationPackage;",
          packageInstance: "new AMapGeolocationPackage()"
        }
      }
    }
  }
};
