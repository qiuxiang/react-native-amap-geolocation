import { NativeModules, NativeEventEmitter } from "react-native"
const { AMapGeolocation } = NativeModules
const eventEmitter = new NativeEventEmitter(AMapGeolocation)

export default {
  hello: () => AMapGeolocation.hello()
}
