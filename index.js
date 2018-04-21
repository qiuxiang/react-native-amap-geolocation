import React from "react"
import { AppRegistry, Text } from "react-native"
import { Geolocation } from "react-native-amap-geolocation"

class App extends React.Component {
  state = { text: "" }

  async componentDidMount() {
    const text = await Geolocation.hello()
    this.setState({ text })
  }

  render() {
    return <Text>{this.state.text}</Text>
  }
}

AppRegistry.registerComponent("RNAMapGeolocation", () => App)
