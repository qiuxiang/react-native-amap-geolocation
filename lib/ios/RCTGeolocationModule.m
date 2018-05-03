#import <React/RCTEventEmitter.h>
#import <AMapFoundationKit/AMapFoundationKit.h>
#import <AMapLocationKit/AMapLocationKit.h>

@interface RCTLocationModule : RCTEventEmitter <RCTBridgeModule, AMapLocationManagerDelegate>
@end

@implementation RCTLocationModule {
    AMapLocationManager *_manager;
}

RCT_EXPORT_MODULE(AMapGeolocation)

RCT_EXPORT_METHOD(setOptions:(NSDictionary *)options) {
    if (options[@"distanceFilter"]) {
        _manager.distanceFilter = [options[@"distanceFilter"] doubleValue];
    }
    if (options[@"reGeocode"]) {
        _manager.locatingWithReGeocode = [options[@"reGeocode"] boolValue];
    }
}

RCT_REMAP_METHOD(init, key:(NSString *)key resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    [AMapServices sharedServices].apiKey = key;
    if (!_manager) {
        _manager = [AMapLocationManager new];
        _manager.delegate = self;
        resolve(nil);
    } else {
        resolve(nil);
    }
}

RCT_EXPORT_METHOD(start) {
    [_manager startUpdatingLocation];
}

RCT_EXPORT_METHOD(stop) {
    [_manager stopUpdatingLocation];
}

RCT_REMAP_METHOD(getLastLocation, resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    id json = [NSUserDefaults.standardUserDefaults objectForKey:RCTLocationModule.storeKey];
    [self sendEventWithName:@"AMapGeolocation" body: json];
}
                   
- (id)json:(CLLocation *)location reGeocode:(AMapLocationReGeocode *)reGeocode {
    if (reGeocode && reGeocode.formattedAddress.length) {
        return @{
            @"accuracy": @(location.horizontalAccuracy),
            @"latitude": @(location.coordinate.latitude),
            @"longitude": @(location.coordinate.longitude),
            @"altitude": @(location.altitude),
            @"speed": @(location.speed),
            @"direction": @(location.course),
            @"timestamp": @(location.timestamp.timeIntervalSince1970 * 1000),
            @"address": reGeocode.formattedAddress,
            @"poiName": reGeocode.POIName,
            @"country": reGeocode.country,
            @"province": reGeocode.province,
            @"city": reGeocode.city,
            @"cityCode": reGeocode.citycode,
            @"district": reGeocode.district,
            @"street": reGeocode.street,
            @"streetNumber": reGeocode.number,
            @"adCode": reGeocode.adcode,
        };
    } else {
        return @{
            @"accuracy": @(location.horizontalAccuracy),
            @"latitude": @(location.coordinate.latitude),
            @"longitude": @(location.coordinate.longitude),
            @"altitude": @(location.altitude),
            @"speed": @(location.speed),
            @"direction": @(location.course),
            @"timestamp": @(location.timestamp.timeIntervalSince1970 * 1000),
        };
    }
}

- (void)amapLocationManager:(AMapLocationManager *)manager
          didUpdateLocation:(CLLocation *)location
                  reGeocode:(AMapLocationReGeocode *)reGeocode {
    id json = [self json:location reGeocode:reGeocode];
    [self sendEventWithName:@"AMapGeolocation" body: json];
    [NSUserDefaults.standardUserDefaults setObject:json forKey:RCTLocationModule.storeKey];
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"AMapGeolocation"];
}

+ (NSString *)storeKey {
    return @"AMapGeolocation";
}

@end
