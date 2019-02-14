import React from "react";
import { AppRegistry, Button, StyleSheet, Text, View, PermissionsAndroid } from "react-native";
import { Geolocation } from "react-native-amap-geolocation";

const style = StyleSheet.create({
  body: {
    padding: 16
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    marginBottom: 24
  },
  item: {
    flexDirection: "row",
    marginBottom: 4
  },
  label: {
    color: "#f5533d",
    width: 120,
    paddingRight: 10,
    textAlign: "right"
  }
});

class App extends React.Component {
  state = { location: {} };

  async componentDidMount() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      await Geolocation.init({
        ios: "9bd6c82e77583020a73ef1af59d0c759",
        android: "043b24fe18785f33c491705ffe5b6935"
      });
      Geolocation.setOptions({
        interval: 10000,
        distanceFilter: 10,
        background: true,
        reGeocode: true
      });
      Geolocation.addLocationListener(location => this.updateLocationState(location));
    } else {
      console.error("Location permission denied");
    }
  }

  componentWillUnmount() {
    Geolocation.stop();
  }

  updateLocationState(location) {
    if (location) {
      location.timestamp = new Date(location.timestamp).toLocaleString();
      this.setState({ location });
      console.log(location);
    }
  }

  startLocation = () => Geolocation.start();
  stopLocation = () => Geolocation.stop();
  getLastLocation = async () => this.updateLocationState(await Geolocation.getLastLocation());

  render() {
    const { location } = this.state;
    return (
      <View style={style.body}>
        <View style={style.controls}>
          <Button style={style.button} onPress={this.startLocation} title="开始定位" />
          <Button style={style.button} onPress={this.stopLocation} title="停止定位" />
        </View>
        {Object.keys(location).map(key => (
          <View style={style.item} key={key}>
            <Text style={style.label}>{key}</Text>
            <Text>{location[key]}</Text>
          </View>
        ))}
      </View>
    );
  }
}

AppRegistry.registerComponent("RNAMapGeolocation", () => App);
