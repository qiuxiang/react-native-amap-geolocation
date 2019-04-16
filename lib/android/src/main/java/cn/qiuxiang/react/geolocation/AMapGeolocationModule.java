package cn.qiuxiang.react.geolocation;

import android.support.annotation.NonNull;
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

@SuppressWarnings("unused")
public class AMapGeolocationModule extends ReactContextBaseJavaModule implements AMapLocationListener {
    private ReactApplicationContext reactContext;
    private DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter;
    private AMapLocationClient client;
    private AMapLocationClientOption option = new AMapLocationClientOption();

    AMapGeolocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "AMapGeolocation";
    }

    @Override
    public void onLocationChanged(AMapLocation location) {
        eventEmitter.emit("AMapGeolocation", locationToMap(location));
    }

    @ReactMethod
    public void init(String key, Promise promise) {
        if (client != null) {
            client.onDestroy();
        }

        AMapLocationClient.setApiKey(key);
        client = new AMapLocationClient(reactContext);
        client.setLocationListener(this);
        eventEmitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        promise.resolve(null);
    }

    @ReactMethod
    public void start() {
        client.startLocation();
    }

    @ReactMethod
    public void stop() {
        client.stopLocation();
    }

    @ReactMethod
    public void getLastLocation(Promise promise) {
        promise.resolve(locationToMap(client.getLastKnownLocation()));
    }

    @ReactMethod
    public void setInterval(int interval) {
        option.setInterval(interval);
        client.setLocationOption(option);
    }

    private ReadableMap locationToMap(AMapLocation location) {
        if (location == null) {
            return null;
        }
        WritableMap map = Arguments.createMap();
        if (location.getErrorCode() == 0) {
            map.putDouble("timestamp", location.getTime());
            map.putDouble("accuracy", location.getAccuracy());
            map.putDouble("latitude", location.getLatitude());
            map.putDouble("longitude", location.getLongitude());
            map.putDouble("altitude", location.getAltitude());
            map.putDouble("speed", location.getSpeed());
            map.putInt("locationType", location.getLocationType());
            if (!location.getAddress().isEmpty()) {
                map.putString("address", location.getAddress());
                map.putString("description", location.getDescription());
                map.putString("poiName", location.getPoiName());
                map.putString("country", location.getCountry());
                map.putString("province", location.getProvince());
                map.putString("city", location.getCity());
                map.putString("cityCode", location.getCityCode());
                map.putString("district", location.getDistrict());
                map.putString("street", location.getStreet());
                map.putString("streetNumber", location.getStreetNum());
                map.putString("adCode", location.getAdCode());
            }
        } else {
            map.putInt("errorCode", location.getErrorCode());
            map.putString("errorInfo", location.getErrorInfo());
        }
        return map;
    }
}