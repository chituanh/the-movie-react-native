import { Appbar, Divider, List, Switch } from "react-native-paper";
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Button } from "react-native-paper";

import React from "react";
import Colors from "../constants/Colors";

const Profile = (props) => {
  const { width, height } = Dimensions.get("window");
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />

      {/* View card profile */}
      <View style={styles.cardProfileScreen}>
        <Image
          style={styles.image}
          source={{
            uri:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
          }}
        />
        <View style={styles.listInfomation}>
          <Text style={styles.infomationName}>Phùng Thế Tài</Text>
          <Text style={styles.infomationDetail}>Hà nội, Việt Nam</Text>
          <Text style={styles.infomationDetail}>chituanh212@gmail.com</Text>
        </View>
      </View>

      {/* action setting */}
      <View style={styles.actionSettingContainer}>
        <List.Item
          titleStyle={styles.itemList}
          title="Ngôn Ngữ"
          right={(props) => (
            <List.Icon {...props} icon="arrow-right" color="white" />
          )}
        />
        <Divider style={styles.divider} />
        <List.Item
          titleStyle={styles.itemList}
          title="Địa Chỉ"
          right={(props) => (
            <Switch {...props} value={true} onValueChange={() => {}} />
          )}
        />
        <Divider style={styles.divider} />
        <List.Item
          title="Thông báo"
          right={(props) => (
            <Switch {...props} value={true} onValueChange={() => {}} />
          )}
          titleStyle={styles.itemList}
        />
        <Divider style={styles.divider} />
        <List.Item
          title="Quốc Gia"
          right={(props) => (
            <List.Icon {...props} icon="arrow-right" color="white" />
          )}
          titleStyle={styles.itemList}
        />
        <Divider style={styles.divider} />
        <List.Item
          title="Chính Sách Bảo Mật"
          right={(props) => (
            <List.Icon {...props} icon="arrow-right" color="white" />
          )}
          titleStyle={styles.itemList}
        />
      </View>

      <View style = {{margin: 10,padding: 10}} >
        <Button
          color="red"
          onPress={() => {
            Alert.alert("Thông báo!!", "Bạn có muốn thoát không??", [
              {
                text: "Đồng ý",
                style: 'destructive',
                onPress: () => {
                  console.log(props.navigation.replace("Login"));
                },
              },
              { text: "Hủy", style: 'cancel'},
            ]);
          }}
        >
          <Text style = {{fontSize: 19}} >ĐĂNG XUẤT</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appbarContainer: {
    backgroundColor: "#37474f",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#37474f",
  },
  divider: {
    height: 2,
    marginHorizontal: 10,
  },
  cardProfileScreen: {
    backgroundColor: "#455a64",
    padding: 10,
    margin: 20,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 20,
    borderRadius: 80 / 2,
  },
  listInfomation: {
    justifyContent: "center",
  },
  infomationName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infomationDetail: {
    color: "white",
    marginBottom: 5,
  },
  actionSettingContainer: {
    backgroundColor: "#455a64",
    margin: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },

    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  itemList: {
    color: "white",
  },
});

export default Profile;
