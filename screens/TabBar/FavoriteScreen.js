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
  SectionList,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";
import FilmItem from "../../components/UI/FilmItem";

const { width, height } = Dimensions.get("window");

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
            props.navigation.navigate("ListFilm", {
              listItem: props.listItem,
              nameCategory: props.name
            });
          }}
        >
          <Text style={{ color: "white" }}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        keyExtractor={(item) => item.Key}
        numColumns={2}
        data={props.listItem.slice(0, 4)}
        renderItem={(propsRender) => (
          <FilmItem
            item={propsRender.item}
            onTap={() => {
              props.navigation.navigate("DetailFilm", {
                itemId: propsRender.item,
              });
            }}
          />
        )}
        numColumns={2}
      />
    </View>
  );
};

const FavoriteScreen = (props) => {
  const film = useSelector((state) => state.film.film);
  const listCategory = useSelector((state) => state.film.listAction);

  return (
    <ScrollView>
      <View style={styles.screen}>
        {listCategory.map((item) => {
          return (
            <FavoriteItem
              name={item}
              listItem={film.filter((hihi) => hihi.Category.includes(item))}
              {...props}
            />
          );
        })}
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
