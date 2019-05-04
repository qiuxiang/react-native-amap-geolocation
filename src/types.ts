/**
 * 高德开放平台应用 Key
 */
export interface AppKey {
  ios: string;
  android: string;
}

/**
 * 定位结果类型
 *
 * @platform android
 */
export enum LocationType {
  /**
   * 卫星定位结果
   *
   * 通过设备卫星定位模块返回的定位结果
   */
  GPS = 1,

  /**
   * 前次定位结果
   *
   * 网络定位请求低于1秒、或两次定位之间设备位置变化非常小时返回，设备位移通过传感器感知
   */
  SAME_REQ,

  /**
   * @deprecated
   */
  FAST,

  /**
   * 缓存定位结果
   *
   * 返回一段时间前设备在相同的环境中缓存下来的网络定位结果，节省无必要的设备定位消耗
   */
  FIX_CACHE,

  /**
   * Wifi定位结果
   *
   * 属于网络定位，定位精度相对基站定位会更好
   */
  WIFI,

  /**
   * 基站定位结果
   *
   * 属于网络定位
   */
  CELL,

  AMAP,

  /**
   * 离线定位结果
   */
  OFFLINE,

  /**
   * 最后位置缓存
   */
  LAST_LOCATION_CACHE
}

/**
 * iOS 错误代码
 *
 * @platform ios
 */
export enum ErrorCodeIOS {}

/**
 * Android 错误代码
 *
 * @platform android
 */
export enum ErrorCodeAndroid {
  /**
   * 定位成功
   */
  LOCATION_SUCCESS,

  /**
   * 一些重要参数为空，可以通过 [[Location.locationDetail]] 获取详细信息
   */
  INVALID_PARAMETER,

  /**
   * 定位失败，由于设备仅扫描到单个 wifi，不能精准的计算出位置信息
   */
  FAILURE_WIFI_INFO,

  /**
   * 获取到的请求参数为空，可能获取过程中出现异常，可以通过 [[Location.locationDetail]] 获取详细信息
   */
  FAILURE_LOCATION_PARAMETER,

  /**
   * 网络连接异常，可以通过 [[Location.locationDetail]] 获取详细信息
   */
  FAILURE_CONNECTION,

  /**
   * 解析 XML 出错，可以通过 [[Location.locationDetail]] 获取详细信息
   */
  FAILURE_PARSER,

  /**
   * 定位结果错误，可以通过 [[Location.locationDetail]] 获取详细信息
   */
  FAILURE_LOCATION,

  /**
   * Key 错误，可以通过 [[Location.locationDetail]] 获取详细信息来跟注册的 Key 信息进行对照
   */
  FAILURE_AUTH,

  /**
   * 其他错误，可以通过 [[Location.locationDetail]] 获取详细信息
   */
  UNKNOWN,

  /**
   * 初始化异常，可以通过 [[Location.locationDetail]] 获取详细信息
   */
  FAILURE_INIT,

  /**
   * 定位服务启动失败，请检查是否配置 service 并且 manifest 中 service 标签是否配置在 application 标签内
   */
  SERVICE_FAIL,

  /**
   * 错误的基站信息，请检查是否安装 sim 卡
   */
  FAILURE_CELL,

  /**
   * 缺少定位权限，请检查是否配置定位权限，并在安全软件和设置中给应用打开定位权限
   */
  FAILURE_LOCATION_PERMISSION,

  /**
   * 网络定位失败，请检查设备是否插入 sim 卡、开启移动网络或开启了 wifi 模块
   */
  FAILURE_NOWIFIANDAP,

  /**
   * 卫星定位失败，可用卫星数不足
   */
  FAILURE_NOENOUGHSATELLITES,

  /**
   * 定位位置可能被模拟
   */
  FAILURE_SIMULATION_LOCATION,

  /**
   * 定位失败，飞行模式下关闭了 wifi 开关，请关闭飞行模式或者打开 wifi 开关
   */
  AIRPLANEMODE_WIFIOFF = 18,

  /**
   * 定位失败，没有检查到 sim 卡，并且关闭了 wifi 开关，请打开 wifi 开关或者插入 sim 卡
   */
  NOCGI_WIFIOFF
}

export type ErrorCode = ErrorCodeAndroid | ErrorCodeIOS;

/**
 * 定位模式，目前支持三种定位模式
 *
 * @platform android
 */
export enum LocationMode {
  /**
   * 低功耗模式，在这种模式下，将只使用高德网络定位。
   */
  Battery_Saving = "Battery_Saving",

  /**
   * 仅设备模式，只使用卫星定位，不支持室内环境的定位
   */
  Device_Sensors = "Device_Sensors",

  /**
   * 高精度模式，在这种定位模式下，将同时使用高德网络定位和卫星定位，优先返回精度高的定位
   */
  Hight_Accuracy = "Hight_Accuracy"
}

/**
 * 定位场景
 *
 * @platform android
 */
export enum LocationPurpose {
  /**
   * 签到场景
   *
   * 只进行一次定位返回最接近真实位置的定位结果（定位速度可能会延迟 1-3s）。
   */
  SignIn = "SignIn",

  /**
   * 运动场景
   *
   * 高精度连续定位，适用于有户内外切换的场景，卫星定位和网络定位相互切换，卫星定位成功之后网络定位不再返回，卫星信号断开之后一段时间才会返回网络结果。
   */
  Sport = "Sport",

  /**
   * 出行场景
   *
   * 高精度连续定位，适用于有户内外切换的场景，卫星定位和网络定位相互切换，卫星定位成功之后网络定位不再返回，卫星信号断开之后一段时间才会返回网络结果。
   */
  Transport = "Transport"
}

/**
 * 逆地理编码语言
 */
export enum GeoLanguage {
  /**
   * 默认，根据位置按照相应的语言返回逆地理信息，在国外按英语返回，在国内按中文返回
   */
  DEFAULT = "DEFAULT",

  /**
   * 中文，无论在国外还是国内都为返回中文的逆地理信息
   */
  ZH = "ZH",

  /**
   * 英文，无论在国外还是国内都为返回英文的逆地理信息
   */
  EN = "EN"
}

/**
 * 卫星信号强度
 *
 * @platform android
 */
export enum GpsAccuracy {
  UNKNOWN,
  BAD,
  GOOD
}

/**
 * 定位结果的可信度
 */
export enum TrustedLevel {
  HIGH = 1,
  NORMAL,
  LOW,
  BAD
}

/**
 * 定位信息
 */
export interface Location {
  /**
   * 定位精度 (米)
   */
  accuracy: number;

  /**
   * 经度，[-180, 180]
   */
  latitude: number;

  /**
   * 纬度，[-90, 90]
   */
  longitude: number;

  /**
   * 海拔（米），需要 GPS
   */
  altitude?: number;

  /**
   * 移动速度（米/秒），需要 GPS
   */
  speed?: number;

  /**
   * 移动方向，需要 GPS
   */
  heading?: number;

  /**
   * 定位时间（毫秒）
   */
  timestamp?: number;

  /**
   * 错误码
   */
  errorCode?: ErrorCode;

  /**
   * 错误信息
   */
  errorInfo?: string;

  /**
   * 定位信息描述
   *
   * @platform android
   */
  locationDetail?: string;

  /**
   * 定位结果来源
   *
   * @platform android
   */
  locationType?: LocationType;

  /**
   * 卫星信号强度，仅在卫星定位时有效
   *
   * @platform android
   */
  gpsAccuracy?: GpsAccuracy;

  /**
   * 坐标系类型
   *
   * @platform android
   */
  coordinateType?: "WGS84" | "GCJ02";

  /**
   * 定位结果的可信度，只有在定位结果正确时，才有意义
   *
   * @platform android
   */
  trustedLevel?: TrustedLevel;
}

/**
 * 逆地理编码信息
 */
export interface ReGeocode {
  /**
   * 详细地址
   */
  address?: string;

  /**
   * 国家
   */
  country?: string;

  /**
   * 省份
   */
  province?: string;

  /**
   * 城市
   */
  city?: string;

  /**
   * 城市编码
   */
  cityCode?: string;

  /**
   * 地区
   */
  district?: string;

  /**
   * 街道
   */
  street?: string;

  /**
   * 门牌号
   */
  streetNumber?: string;

  /**
   * 兴趣点
   */
  poiName?: string;
}
