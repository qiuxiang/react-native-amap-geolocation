import React from "react";
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform
} from "react-native";
import { init, addLocationListener, start, stop, setInterval } from "react-native-amap-geolocation";

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
  },
  result: {
    fontFamily: Platform.OS === "ios" ? "menlo" : "monospace"
  }
});

class App extends React.Component {
  state = { location: null };

  async componentDidMount() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      await init({
        ios: "9bd6c82e77583020a73ef1af59d0c759",
        android: "043b24fe18785f33c491705ffe5b6935"
      });
      addLocationListener(location => this.updateLocationState(location));
    } else {
      console.error("Location permission denied");
    }
  }

  componentWillUnmount() {
    stop();
  }

  updateLocationState(location) {
    if (location) {
      location.time = new Date(location.timestamp).toLocaleString();
      this.setState({ location });
      console.log(location);
    }
  }

  startLocation = () => start();
  stopLocation = () => {
    stop();
    this.setState({ location: null });
  };

  setInterval2000 = () => setInterval(2000);
  setInterval10000 = () => setInterval(10000);

  render() {
    const { location } = this.state;
    return (
      <View style={style.body}>
        <View style={style.controls}>
          <Button style={style.button} onPress={this.startLocation} title="开始定位" />
          <Button style={style.button} onPress={this.stopLocation} title="停止定位" />
          <Button style={style.button} onPress={this.setInterval2000} title="设置定位间隔：2000" />
          <Button style={style.button} onPress={this.setInterval10000} title="设置定位间隔：10000" />
        </View>
        <Text style={style.result}>{JSON.stringify(location, null, 2)}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent("RNAMapGeolocation", () => App);
