import { EventSubscription } from "react-native";

export interface Options {
  /**
   *  是否返回地址信息，默认 false
   */
  reGeocode: boolean;

  /**
   *  是否启用后台定位，默认 false，仅用于 iOS
   */
  background: boolean;

  /**
   * 最小更新距离，默认 0 米，即只要位置更新就立即返回，仅用于 iOS
   *
   */
  distanceFilter: number;

  /**
   * 定位请求间隔，默认 2000 毫秒，仅用于 Android
   *
   */
  interval: number;
}

export interface Location {
  accuracy: number; // 定位精度 (m)
  latitude: number; // 经度
  longitude: number; // 纬度
  altitude: number; // 海拔 (m)，需要 GPS
  speed: number; // 速度 (m/s)，需要 GPS
  direction: number; // 移动方向，需要 GPS
  timestamp: number; // 定位时间
  address?: string; // 详细地址
  country?: string; // 国家
  province?: string; // 省份
  city?: string; // 城市
  cityCode?: string; // 城市编码
  district?: string; // 区
  street?: string; // 街道
  streetNumber?: string; // 门牌号
  poiName?: string; // 兴趣点
}

interface IGeolocation {
  init: (params: { ios: string; android: string }) => Promise<void>;
  setOptions: (options: Options) => void;
  start: () => void;
  stop: () => void;
  addLocationListener: (
    func: (location: Location) => void
  ) => EventSubscription;
  getLastLocation: () => Promise<Location>;
}

export const Geolocation: IGeolocation;
