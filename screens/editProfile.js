import { Button, TextInput } from "react-native-paper";
import {
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

const EditProfile = (props) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={60}
    >
      <ScrollView style={styles.screen}>
        <View style={styles.screen}>
          {/* hihi */}
          <View style={styles.changeImageContainer}>
            <Image
              style={styles.image}
              source={{
                uri:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
              }}
            />
            <TouchableOpacity style={styles.buttomChange}>
              <Text style={styles.titleChange}>Thay đổi ảnh đại diện</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerInput}>
            <TextInput
              mode="outlined"
              style={styles.input}
              label="Họ Và Tên"
            />
          </View>

          <View style={styles.containerInput}>
            <TextInput
              mode="outlined"
              style={styles.input}
              label="Email"
              placeholderTextColor="white"
            />
          </View>

          <View style={styles.containerInput}>
            <TextInput
              mode="outlined"
              style={styles.input}
              label="Địa chỉ"
              placeholderTextColor="white"
            />
          </View>

          <View style={styles.containerInput}>
            <TextInput
              mode="outlined"
              style={styles.input}
              label="Quốc Gia"
              placeholderTextColor="white"
            />
          </View>

          <TouchableOpacity>
            <View style={styles.buttomSave}>
              <Button
                mode="contained"
                labelStyle={{ fontWeight: "bold" }}
                style={{
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                LƯU THAY ĐỔI
              </Button>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.backgroudColor,
    flex: 1,
  },
  changeImageContainer: {
    height: 200,
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
    marginVertical: 10,
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
  },
});

export default EditProfile;
