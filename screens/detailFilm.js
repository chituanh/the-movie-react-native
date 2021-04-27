import { Divider, IconButton } from "react-native-paper";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import Colors from "../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import * as filmsActions from "../store/actions/film";
import FilmItem from "../components/UI/FilmItem";

const DetailFilm = (props) => {
  const itemNi = props.route.params.itemId;
  const list = useSelector((state) => state.film.film);

  return (
    <ScrollView
      style={{ backgroundColor: Colors.backgroudColor }}
      blurRadius={100}
    >
      <View style={styles.screen}>
        {/* Ảnh nà */}
        <View style={styles.imageBackgroundContainer}>
          <ImageBackground
            style={styles.ImageBackground}
            source={{
              uri: itemNi.Image,
            }}
          >
            <View style={styles.textInImage}>
              <View>
                <Text style={styles.textBold}>{itemNi.Name}</Text>
                <Text style={styles.text}>{itemNi.Category}</Text>
              </View>
              <View style={styles.button}>
                <IconButton
                  icon="play"
                  onPress={() => {
                    console.log(props.navigation.push("PlayVideo", {
                      item: itemNi,
                    }));
                  }}
                />
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Thông tin như gì đó */}
        <View style={styles.thongTinThoiLuong}>
          <View style={styles.subThongTinThoiLuong}>
            <Text style={styles.textBold}>{itemNi.Duration}min</Text>
            <Text style={styles.text}>Duration</Text>
          </View>
          <View style={styles.subThongTinThoiLuong}>
            <Text style={styles.textBold}>{itemNi.View}</Text>
            <Text style={styles.text}>View</Text>
          </View>
          <View style={styles.subThongTinThoiLuong}>
            <Text style={styles.textBold}>{itemNi.Rate}/5</Text>
            <Text style={styles.text}>Rate</Text>
          </View>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: "white",
            marginHorizontal: 15,
            width: "93%",
            marginTop: 15,
          }}
        ></View>

        {/* Thông tin sản xuất */}
        <View style={styles.thongTinSanXuat}>
          <View style={styles.columContainer}>
            <Text style={styles.text}>Release</Text>
            <Text style={styles.text}>{itemNi.ReleaseDate}</Text>
          </View>

          <View style={styles.columContainer}>
            <Text style={styles.text}>Director:</Text>
            <Text style={styles.text}>{itemNi.Director}</Text>
          </View>

          <View style={styles.columContainer}>
            <Text style={styles.text}>Writers:</Text>
            <Text style={styles.text}>{itemNi.Writes}</Text>
          </View>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: "white",
            marginHorizontal: 15,
            width: "93%",
          }}
        ></View>

        {/* Mô tả */}
        <View style={styles.synopsisContainer}>
          <Text style={styles.textBold}>Synopsis</Text>
          <View style={{ height: 15 }}></View>
          <Text style={styles.text}>
            {itemNi.Synopsis}
          </Text>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: "white",
            marginHorizontal: 15,
            width: "93%",
          }}
        ></View>

        {/* list video liên quan */}
        <View style={styles.videoStillsContainer}>
          <Text style={styles.textBold}>Video Stills</Text>
          <View style={{ height: 15 }}></View>
          <FlatList
            keyExtractor={(item) => item.key}
            horizontal={true}
            data={list}
            renderItem={(propsRender) => (
              <FilmItem
                item={propsRender.item}
                onTap={() => {
                  props.navigation.push("DetailFilm", {
                    itemId: propsRender.item,
                  });
                }}
              />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.backgroudColor,
  },
  imageBackgroundContainer: {
    height: 250,
    width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  ImageBackground: {
    height: 250,
    width: "100%",
  },
  textInImage: {
    height: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    padding: 20,
  },
  textBold: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  text: {
    color: "white",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 100,
  },
  thongTinThoiLuong: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  subThongTinThoiLuong: {
    justifyContent: "center",
    alignItems: "center",
  },
  thongTinSanXuat: {
    marginTop: 30,
    width: "100%",
  },
  columContainer: {
    height: 40,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  synopsisContainer: {
    margin: 15,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  videoStillsContainer: {
    margin: 15,
  },
});

export default DetailFilm;
