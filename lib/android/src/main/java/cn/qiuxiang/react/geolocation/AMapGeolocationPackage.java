package cn.qiuxiang.react.geolocation;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import org.jetbrains.annotations.NotNull;

import java.util.Collections;
import java.util.List;

public class AMapGeolocationPackage implements ReactPackage {
    @NotNull
    @Override
    public List<ViewManager> createViewManagers(@NotNull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @NotNull
    @Override
    public List<NativeModule> createNativeModules(@NotNull ReactApplicationContext reactContext) {
        return Collections.singletonList(new AMapGeolocationModule(reactContext));
    }
}