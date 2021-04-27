import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React from "react";

const FilmItem = (props) => {
    const { width, height } = Dimensions.get("window");
  var txtCategory = "";
  for (var i in props.item.Category) {
    txtCategory += props.item.Category[i] + ", ";
  }
  const listWidth = width / 2 - 10;
  return (
    <TouchableOpacity
      onPress={props.onTap}
    >
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
              height: 200,
              width: "100%",
              borderRadius: 10,
              resizeMode: "stretch",
            }}
          />
        </View>
        <View style={{ padding: 5 }}>
          <Text style={styles.text}>Rate: {props.item.Rate}</Text>
        </View>
        <View style={{ padding: 5 }}>
          <Text style={styles.text}>{props.item.Name}</Text>
          <Text>{txtCategory}</Text>
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
