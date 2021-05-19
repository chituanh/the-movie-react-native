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
import * as userActions from '../store/actions/auth';

import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

const PlayVideoScreen = (props) => {
  const playerRef = useRef();
  const itemNi = props.route.params.item;
  const list = useSelector((state) => state.film.film);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = useSelector((state) => state.auth.userId);

  const IsMuaFilm = (item) => {
    if (!("listFilm" in userInfo)) {
      return false;
    }

    if (userInfo.listFilm.indexOf(item.Key) < 0) {
      return false;
    }
    return true;
  };

  const addFilm = async (item) => {
    await dispatch(userActions.muaFilm(userId, userInfo, item));
  };

  const muaFilm = async (item) => {
    try {
      Alert.alert(
        "Buy Film",
        `Are you sure want to buy the film "${film.Name} với giá ${film.Price}" ?`,
        [
          {
            text: "OK",
            onPress: () => {
              addFilm(item);
              Alert.alert("Notification!", `Purchase of "${film.Name}" is successful.`, [
                { text: "ok" },
              ]);
            },
            style: "default",
          },
          { text: "Cancel", onPress: () => {}, style: "cancel" },
        ]
      );
    } catch (error) {
      console.log(error);
    }
  };

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
          <View
            style={{
              justifyContent: "center",
              marginRight: 20,
              alignItems: "center",
            }}
          >
            <Button
              mode="contained"
              onPress={() => {
                props.navigation.push("Rating", {
                  item: itemNi,
                });
              }}
            >
              View Rating
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
              onPress={
                !IsMuaFilm(item)
                  ? null
                  : () => {
                      props.navigation.push("DetailFilm", {
                        itemId: item,
                      });
                    }
              }
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
                  <View
                    style={{
                      paddingBottom: 10,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.text}>
                      {Math.round(item.Rate * 100) / 100}{" "}
                    </Text>
                    <FontAwesome name="star" color={Colors.primary} />
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
                  {!IsMuaFilm(item) ? (
                    <Button labelStyle={{ color: "red" }} onPress={() => {
                      muaFilm(item);
                    }}>
                      Buy
                    </Button>
                  ) : (
                    <Text></Text>
                  )}
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
