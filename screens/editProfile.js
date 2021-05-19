import { Button, TextInput } from "react-native-paper";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Colors from "../constants/Colors";
import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';


const EditProfile = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const userInfo = useSelector((state) => state.auth.userInfo);
  var txtFullName = userInfo.fullName;
  var txtDiaChi = userInfo.address;
  var txtQuocGia = userInfo.country;

  const updateInfor = async  () => {
    console.log('Update info');
    try {
      await dispatch(authActions.updateInfo(userId, userInfo, txtFullName, txtDiaChi, txtQuocGia));
      await Alert.alert('Notification!', 'Update sucess!!', [{text: 'OK'}])
      props.navigation.pop();
    } catch(error) {
      Alert.alert('Notification!', 'Update failed!!', [{text: 'OK'}])
    }
  } 

  return (
      <ScrollView style={styles.screen}>
        <View style={styles.screen}>
          <View style={styles.changeImageContainer}>
            <Image
              style={styles.image}
              source={{
                uri:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
              }}
            />
            <TouchableOpacity style={styles.buttomChange}>
              <Text style={styles.titleChange}>Change profile picture</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerInput}>
            <TextInput
              mode="outlined"
              style={styles.input}
              label="Full name"
              defaultValue = {userInfo.fullName}
              onChangeText = { (value) => {
                txtFullName = value;
              } }
            />
          </View>

          <View style={styles.containerInput}>
            <TextInput
              mode="outlined"
              style={styles.input}
              label="Address"
              placeholderTextColor="white"
              defaultValue = {userInfo.address}
              onChangeText = { (value) => {
                txtDiaChi = value;
              } }
            />
          </View>

          <View style={styles.containerInput}>
            <TextInput
              mode="outlined"
              style={styles.input}
              label="Country"
              placeholderTextColor="white"
              defaultValue = {userInfo.country}
              onChangeText = { (value) => {
                txtQuocGia = value;
              } }
            />
          </View>

          <TouchableOpacity onPress = {updateInfor} >
            <View style={styles.buttomSave}>
                <Text style = {{fontWeight: 'bold', fontSize: 18, color: 'white'}} >Save Changes</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.backgroudColor,
    flex: 1,
  },
  changeImageContainer: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
  },
  titleChange: {
    marginTop: 10,
    color: Colors.linkColor,
    textDecorationLine: "underline",
    fontSize: 16,
  },
  containerInput: {
    marginVertical: 5,
    marginHorizontal: 20,
  },
  titleInput: {
    color: "white",
    fontSize: 15,
  },
  input: {
    backgroundColor: Colors.backgroudColor,
    tintColor: "white",
    color: "white",
  },
  buttomSave: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: Colors.accent,
    padding: 10,
    alignItems: 'center',
  },
});

export default EditProfile;
