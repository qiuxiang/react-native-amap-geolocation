#import <AMapFoundationKit/AMapFoundationKit.h>
#import <AMapLocationKit/AMapLocationKit.h>
#import <React/RCTEventEmitter.h>

@interface AMapGeolocation
    : RCTEventEmitter <RCTBridgeModule, AMapLocationManagerDelegate>
@end

@implementation AMapGeolocation {
  AMapLocationManager *_manager;
}

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(init, initWithKey
                 : (NSString *)key
                 : (RCTPromiseResolveBlock)resolve
                 : (RCTPromiseRejectBlock)reject) {
  [AMapServices sharedServices].apiKey = key;
  if (!_manager) {
    _manager = [AMapLocationManager new];
    _manager.delegate = self;
  }
  resolve(nil);
}

RCT_EXPORT_METHOD(start) { [_manager startUpdatingLocation]; }

RCT_EXPORT_METHOD(stop) { [_manager stopUpdatingLocation]; }

RCT_EXPORT_METHOD(setLocatingWithReGeocode : (BOOL)value) {
  [_manager setLocatingWithReGeocode:value];
}

RCT_EXPORT_METHOD(setAllowsBackgroundLocationUpdates : (BOOL)value) {
  [_manager setAllowsBackgroundLocationUpdates:value];
}

RCT_EXPORT_METHOD(setPausesLocationUpdatesAutomatically : (BOOL)value) {
  [_manager setPausesLocationUpdatesAutomatically:value];
}

RCT_EXPORT_METHOD(setDesiredAccuracy : (int)value) {
  [_manager setDesiredAccuracy:value];
}

RCT_EXPORT_METHOD(setDistanceFilter : (int)value) {
  [_manager setDistanceFilter:value];
}

RCT_EXPORT_METHOD(setGeoLanguage : (int)value) {
  [_manager setReGeocodeLanguage:(AMapLocationReGeocodeLanguage)value];
}

RCT_EXPORT_METHOD(setReGeocodeTimeout : (int)value) {
  [_manager setReGeocodeTimeout:value];
}

RCT_EXPORT_METHOD(setLocationTimeout : (int)value) {
  [_manager setLocationTimeout:value];
}

- (id)json:(CLLocation *)location reGeocode:(AMapLocationReGeocode *)reGeocode {
  if (reGeocode) {
    return @{
      @"errorCode": @(0),
      @"accuracy" : @(location.horizontalAccuracy),
      @"latitude" : @(location.coordinate.latitude),
      @"longitude" : @(location.coordinate.longitude),
      @"altitude" : @(location.altitude),
      @"speed" : @(location.speed),
      @"heading" : @(location.course),
      @"timestamp" : @(location.timestamp.timeIntervalSince1970 * 1000),
      @"address" : reGeocode.formattedAddress ? reGeocode.formattedAddress : @"",
      @"poiName" : reGeocode.POIName ? reGeocode.POIName : @"",
      @"country" : reGeocode.country ? reGeocode.country : @"",
      @"province" : reGeocode.province ? reGeocode.province : @"",
      @"city" : reGeocode.city ? reGeocode.city : @"",
      @"cityCode" : reGeocode.citycode ? reGeocode.citycode : @"",
      @"district" : reGeocode.district ? reGeocode.district : @"",
      @"street" : reGeocode.street ? reGeocode.street : @"",
      @"streetNumber" : reGeocode.number ? reGeocode.number : @"",
      @"adCode" : reGeocode.adcode ? reGeocode.adcode : @"",
    };
  } else {
    return @{
      @"errorCode": @(0),
      @"accuracy" : @(location.horizontalAccuracy),
      @"latitude" : @(location.coordinate.latitude),
      @"longitude" : @(location.coordinate.longitude),
      @"altitude" : @(location.altitude),
      @"speed" : @(location.speed),
      @"direction" : @(location.course),
      @"timestamp" : @(location.timestamp.timeIntervalSince1970 * 1000),
    };
  }
}

- (void)amapLocationManager:(AMapLocationManager *)manager
          didUpdateLocation:(CLLocation *)location
                  reGeocode:(AMapLocationReGeocode *)reGeocode {
  id json = [self json:location reGeocode:reGeocode];
  [self sendEventWithName:@"AMapGeolocation" body:json];
}

- (void)amapLocationManager:(AMapLocationManager *)manager
           didFailWithError:(NSError *)error {
  [self sendEventWithName:@"AMapGeolocation"
                     body:@{
                       @"errorCode" : @(error.code),
                       @"errorInfo" : error.localizedDescription,
                     }];
}

- (NSArray<NSString *> *)supportedEvents {
  return @[ @"AMapGeolocation" ];
}

@end
