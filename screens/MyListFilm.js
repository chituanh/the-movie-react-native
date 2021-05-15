import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  FlatList,
} from "react-native";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";
import FilmItem from "../components/UI/FilmItem";

const MyListFilm = (props) => {
  const user = useSelector((state) => state.auth.userInfo);
  const film = useSelector((state) => state.film.film);
  const myFilm = film.filter((value) => user.listFilm.includes(value.Key));
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="#040" barStyle="light-content" />
      <ScrollView>
        <FlatList
        keyExtractor = {item => item.Key}
          data={myFilm}
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroudColor,
  },
});

export default MyListFilm;
