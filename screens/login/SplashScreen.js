import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { Button } from "react-native-paper";

import Colors from "../../constants/Colors";

const slides = [
  {
    key: 1,
    title1: "Title 1",
    text:
      "Use filler text that has been edited for length and format \n to match the characteristics of real content as closely",
    image: require("../../assets/images/1.png"),
  },
  {
    key: 2,
    title: "Title 2",
    text: "There's always room for a transport people to another world",
    image: require("../../assets/images/2.png"),
  },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
    };
  }

  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={{ height: 263 * 0.7, width: 369 * 0.7 }}
          resizeMode = 'stretch'
        />

        <Image source={item.image} />
        <View style={{ alignItems: "center", justifyContent: "center", marginTop: 40 }}>
          <Text style={styles.text}>{item.text}</Text>
        </View>

        {item.key == 2 && <View style = {{marginTop: 20}} >
          <Button onPress = {() => {
            console.log(this.props.navigation.replace('SignUp'));
          }} style = {{backgroundColor: 'white', borderRadius: 20}} >
            <Text style = {{fontWeight: 'bold'}} >
            Create An Account
            </Text>
          </Button>
          </View>}
      </View>
    );
  };
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    console.log(this.props.navigation.replace("SignIn"));
    this.setState({ showRealApp: true });
  };
  render() {
    if (this.state.showRealApp) {
      return <App />;
    } else {
      return (
        <AppIntroSlider
         keyExtractor = {(item => item.key.toString())}
          renderItem={this._renderItem}
          data={slides}
          onDone={this._onDone}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: Colors.backgroudColor,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    textAlign: 'center'
  },
});
