## Geolocation

### Methods

#### `init({ ios: string, android: string }): Promise<void>`
初始化并申请权限，参数为 Key，必须在调用其他方法前调用。

- [获取 Android Key](http://lbs.amap.com/api/android-location-sdk/guide/create-project/get-key)
- [获取 iOS Key](http://lbs.amap.com/api/ios-location-sdk/guide/create-project/get-key)

#### `setOptions(options: Options)`
设置定位参数。

#### `start()`
开始定位。

#### `stop()`
停止定位。

#### `addLocationListener(Location => void): EventSubscription`
添加定位监听函数。

#### `getLastLocation(): Promise<Location>`
获取最近一次定位结果。

### Types
```typescript
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

```typescript
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