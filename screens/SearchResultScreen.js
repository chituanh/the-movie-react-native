import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";
import FilmItem from "../components/UI/FilmItem";
import * as filmActions from "../store/actions/film";
import { useSelector, useDispatch } from "react-redux";

const SearchResultScreen = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadError, setLoadError] = React.useState();
  const dispatch = useDispatch();
  const listFilm = useSelector((state) => state.film.searchFilm);
  const keySearch = props.route.params.keySearch;

  const loadedSearchFilm = React.useCallback(async () => {
    try {
      await dispatch(filmActions.searchFilm(keySearch));
    } catch (error) {
      setLoadError(error.toString());
    }
  }, [setLoadError, dispatch]);

  React.useEffect(() => {
    setIsLoading(true);
    setLoadError(null);
    loadedSearchFilm().catch((error) => {
      setLoadError(error.toString);
    });
    setIsLoading(false);
  }, [dispatch, setIsLoading, setLoadError]);

  if (isLoading || listFilm == null) {
    return (
      <View style = {styles.screen} >
        <ActivityIndicator size = 'large' color = {Colors.primary} />
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <View style={styles.searchTitle}>
        <Text style={styles.textResult}>Kết quả của tìm kiếm "{keySearch}" là:</Text>
      </View>

      <ScrollView style={styles.screenListFilm}>
        <FlatList
          keyExtractor={(item) => item.Key}
          data={listFilm}
          numColumns={2}
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroudColor,
  },

  searchTitle: {
    padding: 15,
  },

  screenListFilm: {
    flex: 1,
  },

  textResult: {
    fontSize: 23,
    fontWeight: "bold",
    color: "white",
  },
});

export default SearchResultScreen;
