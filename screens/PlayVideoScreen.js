import React, { useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import YoutubePlayder from "react-native-youtube-iframe";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";

import Colors from "../constants/Colors";

const PlayVideoScreen = (props) => {
  const playerRef = useRef();
  const itemNi = props.route.params.item;
  const list = useSelector((state) => state.film.film);
  return (
    <ScrollView style={styles.screen}>
      <StatusBar backgroundColor="#040" barStyle="dark-content" />
      <View style={styles.containerVideo}>
        <YoutubePlayder
          ref={playerRef}
          height={260}
          webViewStyle={{ margin: 20 }}
          width="100%"
          videoId={itemNi.LinkFilm}
        />
        <View
          style={{
            flexDirection: "row",
            marginRight: 20,
            alignItems: "center",
          }}
        >
          <View style={styles.containerText}>
            <Text style={styles.textBold}>{itemNi.Name}</Text>
            <Text style={styles.text}>{itemNi.Category}</Text>
          </View>
          <View style={{ justifyContent: "center", marginRight: 20 }}>
            <Button
              mode="contained"
              onPress={() => {
                props.navigation.push("Rating", {
                  item: itemNi,
                });
              }}
            >
              Xem Đánh Giá
            </Button>
          </View>
        </View>
      </View>
      <FlatList
        keyExtractor={(item) => item.Image}
        data={list}
        renderItem={({ item, index }) => {
          
          return (
            <TouchableOpacity
              onPress={() => {
                props.navigation.push("DetailFilm", {
                  itemId: item,
                });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  height: 170,
                  margin: 10,
                  padding: 10,
                  borderWidth: 2,
                  borderRadius: 10,
                }}
              >
                <Image
                  source={{ uri: item.Image }}
                  style={{
                    resizeMode: "stretch",
                    borderRadius: 10,
                    height: 150,
                    width: 150,
                  }}
                />
                <View style={styles.infoFilm}>
                  <View style={{ paddingBottom: 10 }}>
                    <Text style={styles.text}>Rate {item.Rate} Sao</Text>
                  </View>
                  <Text
                    style={styles.textBold}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
                    {item.Name}
                  </Text>
                  <View style={{ flexDirection: "row", paddingTop: 10 }}>
                    <Text style={styles.text}>Director: </Text>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={styles.text}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                      >
                        {item.Director}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", paddingTop: 10 }}>
                    <Text style={styles.text}>Stars: </Text>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={styles.text}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                      >
                        {item.Stars}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroudColor,
  },
  containerVideo: {
    backgroundColor: Colors.primary,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  textBold: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    color: "white",
    fontSize: 14,
  },
  containerText: {
    paddingStart: 20,
    paddingBottom: 20,
    width: "65%",
    paddingRight: 20,
  },
  infoFilm: {
    marginLeft: 20,
    flex: 1,
  },
});

export default PlayVideoScreen;
