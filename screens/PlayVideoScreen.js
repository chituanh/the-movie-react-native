import React, { useRef } from "react";

import { View, Text, StyleSheet, StatusBar } from "react-native";
import YoutubePlayder from "react-native-youtube-iframe";
import Colors from "../constants/Colors";

const PlayVideoScreen = (props) => {
  const playerRef = useRef();
  const itemNi = props.route.params.item;
  console.log(itemNi);

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="#040" barStyle="dark-content" />
      <View style = {styles.containerVideo} >
        <YoutubePlayder
          ref={playerRef}
          height={260}
          webViewStyle={{ margin: 20,  }}
          width="100%"
          videoId={itemNi.LinkFilm}
        />
        <View style = {styles.containerText} >
        <Text style = {styles.text} >{itemNi.Name}</Text>
        <Text style = {{color: 'white'}} >{itemNi.Category}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroudColor
  },
  containerVideo: {
    backgroundColor: Colors.primary,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  text: {
    color: 'white',
    fontSize:18,
    fontWeight: 'bold'
  }, 
  containerText:{
    paddingStart: 20,
    paddingBottom: 20,
  }
});

export default PlayVideoScreen;
