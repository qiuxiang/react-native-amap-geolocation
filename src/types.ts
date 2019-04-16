/**
 * 定位结果类型
 */
export enum LocationType {
  /**
   * 卫星定位结果
   *
   * 通过设备卫星定位模块返回的定位结果
   */
  GPS = 1,

  /**
   * 前次定位结果
   *
   * 网络定位请求低于1秒、或两次定位之间设备位置变化非常小时返回，设备位移通过传感器感知
   */
  SAME_REQ,

  /**
   * @deprecated
   */
  FAST,

  /**
   * 缓存定位结果
   *
   * 返回一段时间前设备在相同的环境中缓存下来的网络定位结果，节省无必要的设备定位消耗
   */
  FIX_CACHE,

  /**
   * Wifi定位结果
   *
   * 属于网络定位，定位精度相对基站定位会更好
   */
  WIFI,

  /**
   * 基站定位结果
   *
   * 属于网络定位
   */
  CELL,

  AMAP,

  /**
   * 离线定位结果
   */
  OFFLINE,

  /**
   * 最后位置缓存
   */
  LAST_LOCATION_CACHE
}

/**
 * 定位信息
 */
export interface Location {
  /**
   * 定位精度 (米)
   */
  accuracy: number;

  /**
   * 经度，[-180, 180]
   */
  latitude: number;

  /**
   * 纬度，[-90, 90]
   */
  longitude: number;

  /**
   * 海拔（米），需要 GPS
   */
  altitude?: number;

  /**
   * 移动速度（米/秒），需要 GPS
   */
  speed?: number;

  /**
   * 移动方向，需要 GPS
   */
  direction?: number;

  /**
   * 定位时间（毫秒）
   */
  timestamp?: number;
}

/**
 * 逆地理编码信息
 */
export interface ReGeocode {
  /**
   * 详细地址
   */
  address?: string;

  /**
   * 国家
   */
  country?: string;

  /**
   * 省份
   */
  province?: string;

  /**
   * 城市
   */
  city?: string;

  /**
   * 城市编码
   */
  cityCode?: string;

  /**
   * 地区
   */
  district?: string;

  /**
   * 街道
   */
  street?: string;

  /**
   * 门牌号
   */
  streetNumber?: string;

  /**
   * 兴趣点
   */
  poiName?: string;
}
