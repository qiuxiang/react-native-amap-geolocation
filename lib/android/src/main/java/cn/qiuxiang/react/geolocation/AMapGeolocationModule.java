package cn.qiuxiang.react.geolocation;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AMapGeolocationModule extends ReactContextBaseJavaModule {
    AMapGeolocationModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AMapGeolocation";
    }

    @ReactMethod
    public void hello(Promise promise) {
        promise.resolve("hello");
    }
}