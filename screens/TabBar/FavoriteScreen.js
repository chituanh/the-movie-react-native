import React from "react";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Header,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Colors from "../../constants/Colors";

const { width, height } = Dimensions.get("window");

const Data = [
  {
    key: "p1",
    name: "John Wick",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Jennie_Kim_for_Marie_Claire_Korea_Magazine_on_October_9%2C_2018_%285%29.png",
    favorite: ["Action", "Crime", "Thriller"],
  },
  {
    key: "p2",
    name: "How To Train you",
    imageUrl:
      "https://vcdn-giaitri.vnecdn.net/2021/02/24/j-4353-1614154422.jpg",
    favorite: ["Action", "Animation", "Thriller"],
  },
  {
    key: "p3",
    name: "Long Shot",
    imageUrl:
      "https://media.vov.vn/sites/default/files/styles/large/public/2020-09/eijrzntu8aa-lv-1600819839899628200672-2_0.jpg",
    favorite: ["Action", "Romance"],
  },
  {
    key: "p4",
    name: "Long Shot",
    imageUrl:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2020%2F10%2Fblackpink-jennie-kim-style-wardrobe-essentials-how-to-dress-like-k-pop-celebrity-singer-1.jpg?q=75&w=800&cbr=1&fit=max",
    favorite: ["Action", "Romance"],
  },
];

const FavoriteItem = (props) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 21 }}>
          {props.name}
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.push("FavoriteDetail");
          }}
        >
          <Text style={{ color: "white" }}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        keyExtractor={(item) => item.key}
        numColumns={2}
        data={props.listItem}
        renderItem={(propsItem) => {
          var fav = [];
          for (let index = 0; index < propsItem.item.favorite.length; index++) {
            fav.push(
              <Text style={{ color: "white" }}>
                {propsItem.item.favorite[index] +
                  (index < propsItem.item.favorite.length - 1 ? ", " : "")}
              </Text>
            );
          }
          return (
            <TouchableOpacity>
              <View
                style={{
                  width: width / 2 - 20,
                  margin: 10,
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: propsItem.item.imageUrl }}
                  style={{
                    width: width / 2 - 20,
                    height: 200,
                    borderRadius: 10,
                  }}
                />
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 19 }}
                >
                  {propsItem.item.name}
                </Text>
                <View style={{ flexDirection: "row" }}>{fav}</View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const FavoriteScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <FavoriteItem name="Action" listItem={Data} {...props} />
        <FavoriteItem name="Animation" listItem={Data} {...props} />
        <FavoriteItem name="Crime" listItem={Data} {...props} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroudColor,
    color: "white",
  },
});

export default FavoriteScreen;
