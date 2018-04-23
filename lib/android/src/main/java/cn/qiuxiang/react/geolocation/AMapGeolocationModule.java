package cn.qiuxiang.react.geolocation;

import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.location.AMapLocationClientOption;
import com.amap.api.location.AMapLocationListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class AMapGeolocationModule extends ReactContextBaseJavaModule implements AMapLocationListener {
    private final ReactApplicationContext reactContext;
    private DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter;
    private static AMapLocationClient locationClient;

    AMapGeolocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "AMapGeolocation";
    }

    @Override
    public void onLocationChanged(AMapLocation location) {
        if (location != null) {
            if (location.getErrorCode() == 0) {
                eventEmitter.emit("AMapGeolocation", toReadableMap(location));
            }
            // TODO: 返回定位错误信息
        }
    }

    @ReactMethod
    public void init(String key, Promise promise) {
        if (locationClient != null) {
            locationClient.onDestroy();
        }

        AMapLocationClient.setApiKey(key);
        locationClient = new AMapLocationClient(reactContext);
        locationClient.setLocationListener(this);
        eventEmitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        promise.resolve(null);
    }

    @ReactMethod
    public void setOptions(ReadableMap options) {
        AMapLocationClientOption option = new AMapLocationClientOption();
        if (options.hasKey("interval")) {
            option.setInterval(options.getInt("interval"));
        }
        locationClient.setLocationOption(option);
    }

    @ReactMethod
    public void start() {
        locationClient.startLocation();
    }

    @ReactMethod
    public void stop() {
        locationClient.stopLocation();
    }

    @ReactMethod
    public void getLastLocation(Promise promise) {
        promise.resolve(toReadableMap(locationClient.getLastKnownLocation()));
    }

    private ReadableMap toReadableMap(AMapLocation location) {
        WritableMap map = Arguments.createMap();
        map.putDouble("timestamp", location.getTime());
        map.putDouble("accuracy", location.getAccuracy());
        map.putDouble("latitude", location.getLatitude());
        map.putDouble("longitude", location.getLongitude());
        map.putDouble("altitude", location.getAltitude());
        map.putDouble("speed", location.getSpeed());
        return map;
    }
}