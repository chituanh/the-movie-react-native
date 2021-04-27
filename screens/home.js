import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  View,
} from "react-native";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-native-snap-carousel";

import Colors from "../constants/Colors";
import * as filmActions from "../store/actions/film";
import LinearGradient from "react-native-linear-gradient";
import FilmItem from "../components/UI/FilmItem";

const Home = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const films = useSelector((state) => state.film.film);
  const actionFilm = useSelector((state) => state.film.listAction);
  const dispatch = useDispatch();

  const loadedFilm = useCallback(async () => {
    console.log("Load film");
    try {
      await dispatch(filmActions.getchFilm());
    } catch (err) {
      setError(err);
    }
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    loadedFilm().catch((err) => {
      setError(err.message);
    });
    setIsLoading(false);
  }, [dispatch, loadedFilm]);

  const routeRecents = () => {
    props.navigation.navigate("Recents");
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const renderAction = ({ item, index }) => {
    return (
      <TouchableOpacity activeOpacity={0.7}>
        <View
          style={{
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#99d98c",
            width: "100%",
            height: 120,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  console.log(films);

  return (
    <ScrollView
      style={{ backgroundColor: Colors.backgroudColor }}
      blurRadius={100}
    >
      <StatusBar backgroundColor="#040" barStyle="light-content" />

      <Text style={styles.lable}>Trending</Text>
      <View
        style={{
          height: 300,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Carousel
          keyExtractor={(item) =>  (`first ${item.LinkFilm}`)}
          data={films}
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
          layout="stack"
          sliderWidth={width}
          itemWidth={240}
          autoplay={true}
          useScrollView={true}
          loop={true}
        />
      </View>

      <Text style={styles.lable}>Trailers</Text>

      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Carousel
          keyExtractor={(item) => item.key}
          data={actionFilm}
          renderItem={renderAction}
          layout="default"
          sliderWidth={width}
          itemWidth={150}
          autoplay={true}
          useScrollView={true}
          loop={true}
        />
      </View>
      <Text style={styles.lable}>Opening This Week</Text>
      <FlatList
        keyExtractor={(item) => (`first ${item.LinkFilm}`)}
        data={films}
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
  );
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
});

export default Home;
