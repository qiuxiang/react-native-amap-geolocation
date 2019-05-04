import { start, stop, addLocationListener, Location } from ".";
import { EmitterSubscription } from "react-native";

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
export interface PositionError {
  code: number;
  message: string;
  PERMISSION_DENIED: 1;
  POSITION_UNAVAILABLE: 2;
  TIMEOUT: 3;
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

/**
 * 获取当前位置信息
 *
 * 注意：使用该方法会停止持续定位
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition
 */
export function getCurrentPosition(
  success: (position: Position) => void,
  error?: (error: PositionError) => void,
  options?: PositionOptions
) {
  const listener = addLocationListener(location => {
    success(toPosition(location));
    stop();
    listener.remove();
  });
  start();
}

let count = 0;
const watchMap: { [watchId: number]: EmitterSubscription } = {};

/**
 * 注册监听器进行持续定位
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/watchPosition
 */
export function watchPosition(
  success: (position: Position) => void,
  error?: (error: PositionError) => void,
  options?: PositionOptions
) {
  watchMap[++count] = addLocationListener(location => {
    success(toPosition(location));
  });
  start();
  return count;
}

/**
 * 移除位置监听
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/clearWatch
 */
export function clearWatch(id: number) {
  const listener = watchMap[id];
  if (listener) {
    listener.remove();
  }
}

function toPosition(location: Location) {
  return {
    location,
    coords: {
      latitude: location.latitude,
      longitude: location.longitude,
      altitude: location.altitude,
      accuracy: location.accuracy,
      altitudeAccuracy: null, // 高德定位接口没有找到对应的数据
      heading: location.heading,
      speed: location.speed
    },
    timestamp: location.timestamp
  };
}

/**
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation
 */
export default class Geolocation {
  static getCurrentPosition = getCurrentPosition;
  static watchPosition = watchPosition;
  static clearWatch = clearWatch;
}
