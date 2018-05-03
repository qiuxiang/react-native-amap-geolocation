# Geolocation

## Methods

### `init({ ios: string, android: string }): Promise<void>`

初始化并申请权限，必须在调用其他方法前调用。

---

### `setOptions(options: Options)`

设置定位参数。

---

### `start()`

开始定位。

---

### `stop()`

停止定位。

---

### `addLocationListener(Location => void): EventSubscription`

添加定位监听函数。

---

### `getLastLocation(): Promise<Location>`

获取最近一次定位结果。

## Types

```typescript
type Options = {
  /**
   * 最小更新距离，默认 0 米，即只要位置更新就立即返回，仅用于 iOS
   *
   * 更多请参考 https://bit.ly/2vPTXY7
   */
  distanceFilter: number

  /**
   * 定位请求间隔，默认 2000 毫秒，仅用于 Android
   *
   * 更多请参考 https://bit.ly/2KhmCbu
   */
  interval: number
}

type Location = {
  accuracy: number // 定位精度 (m)
  latitude: number // 经度
  longitude: number // 纬度
  altitude: number // 海拔 (m)，需要 GPS
  speed: number // 速度 (m/s)，需要 GPS
  direction: number // 移动方向，需要 GPS
  timestamp: number // 定位时间
  address?: string // 详细地址
  country?: string // 国家
  province?: string // 省份
  city?: string // 城市
  cityCode?: string // 城市编码
  district?: string // 区
  street?: string // 街道
  streetNumber?: string // 门牌号
  poiName?: string // 兴趣点
}
```
