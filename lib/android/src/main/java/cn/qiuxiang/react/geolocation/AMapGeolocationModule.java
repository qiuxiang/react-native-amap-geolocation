package cn.qiuxiang.react.geolocation;

import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.location.AMapLocationClientOption;
import com.amap.api.location.AMapLocationListener;
import com.facebook.react.bridge.*;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import org.jetbrains.annotations.NotNull;

@SuppressWarnings("unused")
public class AMapGeolocationModule extends ReactContextBaseJavaModule implements AMapLocationListener {
    private final ReactApplicationContext reactContext;
    private final AMapLocationClientOption option = new AMapLocationClientOption();
    private DeviceEventManagerModule.RCTDeviceEventEmitter eventEmitter;
    private AMapLocationClient client;

    AMapGeolocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NotNull
    @Override
    public String getName() {
        return "AMapGeolocation";
    }

    @Override
    public void onLocationChanged(AMapLocation location) {
        if (location != null) {
            eventEmitter.emit("AMapGeolocation", toJSON(location));
        }
    }

    @ReactMethod
    public void init(String key, Promise promise) throws Exception {
        if (client != null) {
            client.onDestroy();
        }

        AMapLocationClient.setApiKey(key);
        AMapLocationClient.updatePrivacyShow(reactContext, true, true);
        AMapLocationClient.updatePrivacyAgree(reactContext, true);
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
    public void addListener(String name) {
    }

    @ReactMethod
    public void removeListeners(Integer count) {
    }

    @ReactMethod
    public void isStarted(Promise promise) {
        promise.resolve(client.isStarted());
    }

    @ReactMethod
    public void getLastKnownLocation(Promise promise) {
        promise.resolve(toJSON(client.getLastKnownLocation()));
    }

    @ReactMethod
    public void setOnceLocation(boolean value) {
        option.setOnceLocation(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setWifiScan(boolean value) {
        option.setWifiScan(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setInterval(int interval) {
        option.setInterval(interval);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setSensorEnable(boolean value) {
        option.setSensorEnable(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setOpenAlwaysScanWifi(boolean value) {
        AMapLocationClientOption.setOpenAlwaysScanWifi(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setNeedAddress(boolean value) {
        option.setNeedAddress(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setOnceLocationLatest(boolean value) {
        option.setOnceLocationLatest(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setMockEnable(boolean value) {
        option.setMockEnable(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setLocationCacheEnable(boolean value) {
        option.setLocationCacheEnable(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setGpsFirst(boolean value) {
        option.setGpsFirst(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setHttpTimeout(int value) {
        option.setHttpTimeOut(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setGpsFirstTimeout(int value) {
        option.setGpsFirstTimeout(value);
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setLocationMode(String mode) {
        option.setLocationMode(AMapLocationClientOption.AMapLocationMode.valueOf(mode));
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setLocationPurpose(String purpose) {
        option.setLocationPurpose(AMapLocationClientOption.AMapLocationPurpose.valueOf(purpose));
        client.setLocationOption(option);
    }

    @ReactMethod
    public void setGeoLanguage(String language) {
        option.setGeoLanguage(AMapLocationClientOption.GeoLanguage.valueOf(language));
        client.setLocationOption(option);
    }

    private ReadableMap toJSON(AMapLocation location) {
        if (location == null) {
            return null;
        }
        WritableMap map = Arguments.createMap();
        map.putInt("errorCode", location.getErrorCode());
        map.putString("errorInfo", location.getErrorInfo());
        map.putString("locationDetail", location.getLocationDetail());
        if (location.getErrorCode() == AMapLocation.LOCATION_SUCCESS) {
            map.putDouble("timestamp", location.getTime());
            map.putDouble("accuracy", location.getAccuracy());
            map.putDouble("latitude", location.getLatitude());
            map.putDouble("longitude", location.getLongitude());
            map.putDouble("altitude", location.getAltitude());
            map.putDouble("speed", location.getSpeed());
            map.putDouble("heading", location.getBearing());
            map.putInt("locationType", location.getLocationType());
            map.putString("coordinateType", location.getCoordType());
            map.putInt("gpsAccuracy", location.getGpsAccuracyStatus());
            map.putInt("trustedLevel", location.getTrustedLevel());
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
        }
        return map;
    }
}
