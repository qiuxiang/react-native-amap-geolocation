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
    resolve(nil);
  } else {
    resolve(nil);
  }
}

RCT_EXPORT_METHOD(start) { [_manager startUpdatingLocation]; }

RCT_EXPORT_METHOD(stop) { [_manager stopUpdatingLocation]; }

RCT_EXPORT_METHOD(setLocatingWithReGeocode : (BOOL)value) {
  [_manager setLocatingWithReGeocode:value];
}

- (id)json:(CLLocation *)location reGeocode:(AMapLocationReGeocode *)reGeocode {
  if (reGeocode && reGeocode.formattedAddress.length) {
    return @{
      @"accuracy" : @(location.horizontalAccuracy),
      @"latitude" : @(location.coordinate.latitude),
      @"longitude" : @(location.coordinate.longitude),
      @"altitude" : @(location.altitude),
      @"speed" : @(location.speed),
      @"direction" : @(location.course),
      @"timestamp" : @(location.timestamp.timeIntervalSince1970 * 1000),
      @"address" : reGeocode.formattedAddress,
      @"poiName" : reGeocode.POIName,
      @"country" : reGeocode.country,
      @"province" : reGeocode.province,
      @"city" : reGeocode.city,
      @"cityCode" : reGeocode.citycode,
      @"district" : reGeocode.district,
      @"street" : reGeocode.street,
      @"streetNumber" : reGeocode.number,
      @"adCode" : reGeocode.adcode,
    };
  } else {
    return @{
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

- (NSArray<NSString *> *)supportedEvents {
  return @[ @"AMapGeolocation" ];
}

@end
