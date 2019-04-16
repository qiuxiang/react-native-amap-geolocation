import { NativeModules, NativeEventEmitter, Platform } from "react-native";
import { Location, ReGeocode } from "./types";
export * from "./types";

const AMapGeolocation = NativeModules.AMapGeolocation;
const eventEmitter = new NativeEventEmitter(AMapGeolocation);

/**
 * 初始化 SDK
 *
 * @param key 高德开放平台应用 Key
 */
export function init(key: { ios: string; android: string }): Promise<void> {
  return AMapGeolocation.init(Platform.select(key));
}

/**
 * 添加定位监听函数
 *
 * @param listener
 */
export function addLocationListener(listener: (location: Location & ReGeocode) => void) {
  return eventEmitter.addListener("AMapGeolocation", listener);
}

/**
 * 开始持续定位
 */
export function start() {
  AMapGeolocation.start();
}

/**
 * 停止持续定位
 */
export function stop() {
  AMapGeolocation.stop();
}

/**
 * 设置发起定位请求的时间间隔（毫秒），默认 2000，最小值为 1000
 *
 * @param interval
 * @platform android
 */
export function setInterval(interval: number) {
  AMapGeolocation.setInterval(interval);
}
