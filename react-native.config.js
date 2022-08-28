module.exports = {
  dependency: { platforms: { android: { sourceDir: "lib/android" } } },
  dependencies: {
    "react-native-amap-geolocation": {
      root: __dirname,
      platforms: {
        android: {
          sourceDir: __dirname + "/lib/android",
          packageImportPath: "import cn.qiuxiang.react.geolocation.AMapGeolocationPackage;",
          packageInstance: "new AMapGeolocationPackage()",
        },
      },
    },
  },
};
