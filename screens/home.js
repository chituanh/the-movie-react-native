import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-native-snap-carousel";
import { Searchbar } from "react-native-paper";

import Colors from "../constants/Colors";
import * as filmActions from "../store/actions/film";
import FilmItem from "../components/UI/FilmItem";

const Home = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  var films = useSelector((state) => state.film.film);
  const actionFilm = useSelector((state) => state.film.listAction);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const loadedFilm = useCallback(async () => {
    try {
      await dispatch(filmActions.getchFilm());
    } catch (err) {
      setError(err);
    }
  }, [dispatch, setError, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    loadedFilm().catch((err) => {
      setError(err.message);
    });
    setIsLoading(false);
  }, [dispatch, loadedFilm, isLoading]);

  if (isLoading || films == null) {
    return (
      <View style={styles.screenCenter}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  } else {
    return (
      <ScrollView
        style={{ backgroundColor: Colors.backgroudColor }}
        blurRadius={100}
      >
        <StatusBar backgroundColor="#040" barStyle="light-content" />

        <View style={{ margin: 10 }}>
          <Searchbar
            placeholder="Search"
            onChangeText={(text) => setSearchQuery(text)}
            onIconPress={() => {
              navigation.push("SearchResult", {
                keySearch: searchQuery,
              });
            }}
          />
        </View>

        <Text style={styles.lable}>Trending</Text>
        <View style={styles.containerTreding}>
          <ScrollView>
            <Carousel
              key={(item) => `first ${item.LinkFilm}`}
              data={films == null ? null : films.slice(0, 10)}
              renderItem={(props) => (
                <FilmItem
                  item={props.item}
                  onTap={() => {
                    navigation.push("DetailFilm", {
                      itemId: props.item,
                    });
                  }}
                />
              )}
              layout="default"
              sliderWidth={width}
              itemWidth={240}
              autoplay={true}
              useScrollView={true}
              loop={true}
            />
          </ScrollView>
        </View>
        <Text style={styles.lable}>Opening This Week</Text>

        <ScrollView>
          <FlatList
            key={(item) => `${item.Image} Cay`}
            data={films == null ? null : films.slice(0, 10)}
            renderItem={(propsRender) => (
              <FilmItem
                item={propsRender.item}
                onTap={() => {
                  navigation.navigate("DetailFilm", {
                    itemId: propsRender.item,
                  });
                }}
              />
            )}
            numColumns={2}
          />
        </ScrollView>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  lable: {
    color: "white",
    fontSize: 20,
    margin: 20,
    fontWeight: "bold",
  },
  text: {
    fontWeight: "bold",
  },
  containerTreding: {
    height: 300,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  screenCenter: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default Home;
