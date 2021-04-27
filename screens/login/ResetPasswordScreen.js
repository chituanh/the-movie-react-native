import React from "react";
import * as Animatable from "react-native-animatable";
import { Avatar, Button, TextInput, RadioButton } from "react-native-paper";
import {
    View,
    Text,
    TouchableOpacity,

    StyleSheet,

    Image,
  } from "react-native";

const ResetPasswordScreen = () => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Animatable.View animation="fadeInUp" duration={1500}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 100, height: 100 }}
        />
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        duration={1500}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Text>Create your Account</Text>
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        duration={1500}
        style={styles.input}
      >
        <TextInput label="Email ID*" style={{ backgroundColor: "#bdbdbd" }} />

        <Button mode="contained" style={styles.buttonLogin}>
          RESET PASSWORD
        </Button>

        <View style={{ alignItems: "center", width: "100%", marginTop: 10 }}>
          <Text>Or Login using Social Media</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <TouchableOpacity>
            <Avatar.Icon size={28} icon="facebook" />
          </TouchableOpacity>
          <View style={{ width: 20 }}></View>
          <TouchableOpacity>
            <Avatar.Icon size={28} icon="google" />
          </TouchableOpacity>
        </View>
      </Animatable.View>

      <View style={{ flexDirection: "row" }}>
        <Text>Alraedy have an account? </Text>
        <TouchableOpacity>
          <Text style={{ color: "blue" }}> Login </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  input: {
    justifyContent: 'space-between',
    backgroundColor: "#bdbdbd",
    margin: 10,
    padding: 20,
    height: 230,
    width: "95%",
    borderRadius: 10,
  },
  textQuenMatKhau: {
    width: "100%",
    marginTop: 10,
    color: "red",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  buttonLogin: {
    marginTop: 10,
    borderRadius: 10,
  },
});
