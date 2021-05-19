import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../../store/actions/auth";
import ListToString from "../FormatData";

const FilmItem = (props) => {
  const { width, height } = Dimensions.get("window");
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = useSelector((state) => state.auth.userId);
  const film = props.item;
  const dispatch = useDispatch();
  var txtCategory = "";
  for (var i in props.item.Category) {
    txtCategory += props.item.Category[i] + ", ";
  }

  const addFilm = async () => {
    await dispatch(userActions.muaFilm(userId, userInfo, film));
  };

  const muaFilm = async () => {
    try {
      Alert.alert(
        "Buy Film",
        `Are you sure want to buy the film "${film.Name} với giá ${film.Price}" ?`,
        [
          {
            text: "OK",
            onPress: () => {
              addFilm();
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

  const IsMuaFilm = () => {
    if (!("listFilm" in userInfo)) {
      return false;
    }

    if (userInfo.listFilm.indexOf(film.Key) < 0) {
      return false;
    }
    return true;
  };

  return (
    <TouchableOpacity onPress={IsMuaFilm() ? props.onTap : null}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          width: width / 2 - 20,
          margin: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ borderRadius: 10, width: "100%" }}>
          <Image
            source={{ uri: props.item.Image }}
            style={{
              height: 150,
              width: "100%",
              borderRadius: 10,
              resizeMode: "cover",
            }}
          />
        </View>
        <View
          style={{
            padding: 10,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.text}>{Math.round(props.item.Rate * 100) /100}/5</Text>
            <FontAwesome name="star" color={Colors.primary} />
          </View>
          <Text style={styles.text}>{props.item.Price}$</Text>
        </View>
        <View style={{ padding: 10 }} >
          <Text  numberOfLines={1} ellipsizeMode = 'tail' style={{ fontWeight: "bold" }}>{props.item.Name}</Text>
          <Text  numberOfLines={1} ellipsizeMode = 'tail'>{ListToString(props.item.Category)}</Text>
        </View>
        <View style = {{marginBottom: 10}} >
          {!IsMuaFilm() ? (
            <Button onPress={!IsMuaFilm() ? muaFilm : null}>
              BUY
            </Button>
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
  },
});

export default FilmItem;
