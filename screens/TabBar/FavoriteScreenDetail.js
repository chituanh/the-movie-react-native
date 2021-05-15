import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FilmItem from "../../components/UI/FilmItem";

import Colors from "../../constants/Colors";

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
      </View>

      <FlatList
        key={(item) => item.key}
        numColumns={2}
        data={props.listItem}
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
      />
    </View>
  );
};

const FavoriteScreenDetail = (props) => {
  return (
    <ScrollView style={styles.screen} >
      <View style={styles.screen}>
        <FavoriteItem name={props.route.params.nameCategory} listItem={props.route.params.listItem} {...props} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroudColor,
  },
});

export default FavoriteScreenDetail;
