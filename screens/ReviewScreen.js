import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import { TextInput, Button } from "react-native-paper";
import Colors from "../constants/Colors";
import * as filmActions from "../store/actions/film";
import {useDispatch, useSelector} from 'react-redux';

const ReviewScreen = (props) => {
  const item = props.route.params.item;
  const [txtTitle, setTxtTitle] =  React.useState('');
  const [txtReview, setTxtReview] = React.useState('');
  const [rateReview, setRateReview] = React.useState(5);
  const [isCheck, setIsCheck] = React.useState();
  const userId = useSelector((state) => state.auth.userId);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  const submit = async () => {
    console.log('Submit');
    try {
      await dispatch(filmActions.reviewFlim(userId, userInfo, item, txtTitle, txtReview, rateReview));
    } catch(error) {
      setIsCheck(error.toString());
    }
    Alert.alert('Thông báo', `${isCheck != null ? isCheck : 'review thành công' }`, [{text:'Ok'}])
    props.navigation.pop();
  } 

  return (
    <View style={styles.screen}>
      <AirbnbRating
        count={5}
        defaultRating={5}
        onFinishRating={(number) => {
          setRateReview(number);
        }}
      />

      <View style={{ margin: 20 }}>
        <TextInput
          mode="flat"
          label="Title"
          underlineColorAndroid="transparent"
          onChangeText = {(text) => {
            setTxtTitle(text);
          }}
          style={{
            backgroundColor: "#bdbdbd70",
            color: "white",
            borderStyle: "solid",
            borderWidth: 0
          }}
        />
        <TextInput
          mode="flat"
          label="Write your Review"
          textAlign="left"
          onChangeText = {(text) => {
            setTxtReview(text);
          }}
          multiline={true}
          underlineColorAndroid="transparent"
          style={{
            height: 150,
            backgroundColor: "#bdbdbd70",
            marginTop: 20,
            color: "white",
            borderStyle: "solid",
            borderWidth: 0
          }}
        />

        <Button
        onPress = {submit}
          mode="outlined"
          style={{
            backgroundColor: Colors.primary,
            marginTop: 30,
            borderRadius: 20,
          }}
          color="white"
        >
          Submit
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroudColor,
  },
});

export default ReviewScreen;
