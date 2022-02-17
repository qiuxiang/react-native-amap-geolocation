import { EmitterSubscription } from "react-native";
import { addLocationListener, start, stop, _options } from "./amap-geolocation";
import { Location } from "./types";

/**
 * 坐标信息
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Coordinates
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
  altitude: number;
  accuracy: number;
  altitudeAccuracy: number;
  heading: number;
  speed: number;
}

/**
 * 定位信息
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Position
 */
export interface Position {
  coords: Coordinates;
  timestamp: number;
  location: Location;
}

/**
 * 定位错误信息
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/PositionError
 */
export class PositionError {
  static PERMISSION_DENIED: 1;
  static POSITION_UNAVAILABLE: 2;
  static TIMEOUT: 3;

  code: number;
  message: string;
  location: Location;

  constructor(code: number, message: string, location: Location) {
    this.code = code;
    this.message = message;
    this.location = location;
  }
}

/**
 * 定位选项
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/PositionOptions
 */
export interface PositionOptions {
  timeout?: number;
  maximumAge?: number;
  enableHighAccuracy?: boolean;

  /**
   * @see [[setDistanceFilter]]
   */
  distanceFilter?: number;
}

let watchId = 0;
const watchMap: { [watchId: number]: EmitterSubscription } = {};

/**
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation
 */
export default class Geolocation {
  /**
   * 获取当前位置信息
   *
   * 注意：使用该方法会停止持续定位
   *
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition
   */
  static getCurrentPosition(
    success: (position: Position) => void,
    error?: (error: PositionError) => void
    // options: PositionOptions = {}
  ) {
    const listener = addLocationListener((location) => {
      if (location.errorCode) {
        error && error(new PositionError(location.errorCode, location.errorInfo ?? "", location));
        stop();
        return listener.remove();
      }
      if (_options.locatingWithReGeocode && typeof location.address !== "string") {
        return;
      }
      success(toPosition(location));
      stop();
      return listener.remove();
    });
    start();
  }

  /**
   * 注册监听器进行持续定位
   *
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/watchPosition
   */
  static watchPosition(
    success: (position: Position) => void,
    error?: (error: PositionError) => void
    // options?: PositionOptions
  ) {
    watchMap[++watchId] = addLocationListener((location) => {
      if (location.errorCode) {
        error && error(new PositionError(location.errorCode, location.errorInfo ?? "", location));
      } else {
        success(toPosition(location));
      }
    });
    start();
    return watchId;
  }

  /**
   * 移除位置监听
   *
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/clearWatch
   */
  static clearWatch(id: number) {
    const listener = watchMap[id];
    if (listener) {
      listener.remove();
    }
  }
}

function toPosition(location: Location) {
  return {
    location,
    coords: {
      latitude: location.latitude,
      longitude: location.longitude,
      altitude: location.altitude ?? 0,
      accuracy: location.accuracy,
      altitudeAccuracy: 0, // 高德定位接口没有找到对应的数据
      heading: location.heading ?? 0,
      speed: location.speed ?? 0,
    },
    timestamp: location.timestamp ?? 0,
  };
}
