import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { ProgressBar} from "react-native-paper";
import {useSelector} from 'react-redux';

const RatingScreen = (props) => {
  const item = props.route.params.item;
  const itemHIHI = useSelector((state) => state.film.film.filter( (prod) => prod.Key == item.Key));
  const itemOK = itemHIHI.shift();
  console.log(itemHIHI.shift());
  const data = itemOK.Evalueate;
  return (
    <ScrollView style = {styles.screen} >
      <View style={styles.screen}>
        <View style={styles.rank}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>All Reviews</Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Review", {'item': item});
              }}
            >
              <Text>Write a Review &gt;</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View
              style={{
                flex: 3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 45, fontWeight: "bold" }}>
                {itemOK.Rate}
              </Text>
              <Text>Out of 05</Text>
            </View>
            <View
              style={{
                flex: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <FontAwesome name="star" size={15} />
                <FontAwesome name="star" size={15} />
                <FontAwesome name="star" size={15} />
                <FontAwesome name="star" size={15} />
                <FontAwesome name="star-half-empty" size={15} />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ProgressBar progress={0.7} color={Colors.primary}/>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <FontAwesome name="star" size={15} />
                <FontAwesome name="star" size={15} />
                <FontAwesome name="star" size={15} />
                <FontAwesome name="star-half-empty" size={15} />
                <FontAwesome name="star-o" size={15} />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ProgressBar progress={0.3} color={Colors.primary} />
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <FontAwesome name="star" size={15} />
                <FontAwesome name="star" size={15} />
                <FontAwesome name="star-half-empty" size={15} />
                <FontAwesome name="star-o" size={15} />
                <FontAwesome name="star-o" size={15} />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ProgressBar progress={0.2} color={Colors.primary} />
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <FontAwesome name="star" size={15} />
                <FontAwesome name="star-half-empty" size={15} />
                <FontAwesome name="star-o" size={15} />
                <FontAwesome name="star-o" size={15} />
                <FontAwesome name="star-o" size={15} />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ProgressBar progress={0.1} color={Colors.accent} />
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <FontAwesome name="star-half-empty" size={15} />
                <FontAwesome name="star-o" size={15} />
                <FontAwesome name="star-o" size={15} />
                <FontAwesome name="star-o" size={15} />
                <FontAwesome name="star-o" size={15} />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ProgressBar progress={0.3} color={Colors.primary} />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.listReview}>
          {data != null && data.length != 0  ? data.map((item) => {
            return (
              <View style={{ padding: 20 }}>
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                  <Image
                    source={{ uri: item.imageUser }}
                    style={{ height: 30, width: 30, borderRadius: 15 }}
                  />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.textBold}>{item.nameUser}</Text>
                    <Text style={styles.text}>{item.time}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <FontAwesome name="star" color={Colors.primary} size={18} />
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        marginLeft: 5,
                      }}
                    >
                      ({item.rate})
                    </Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.text}>{item.review}</Text>
                </View>
                <Text style = {{color: 'white', fontWeight: 'bold', marginTop: 5}} >Like: {item.like}</Text>
                <View style = {{height: 1, backgroundColor: 'white', marginTop: 20}} >
                </View>
              </View>
            );
          }) : <Text>Không có đánh giá</Text>}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.backgroudColor,
    flex: 1,
  },
  rank: {
    backgroundColor: "white",
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
  },
  listReview: {
    flex: 1,
  },
  textBold: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    color: "white",
    fontSize: 14,
  },
});

export default RatingScreen;
