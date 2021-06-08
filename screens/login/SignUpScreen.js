import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Avatar, Button, TextInput, RadioButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

import Colors from "../../constants/Colors";

var txtuserName = "";
var txtemail = "";
var txtpassword = "";

const SignUpScreen = (props) => {
  const [checked, setChecked] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (error) {
      Alert.alert("Notification!!!", error, [{ text: "Yes" }]);
    }
  }, [error]);

  const authSignUp = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(authActions.signup(txtemail, txtpassword, txtuserName));

      props.navigation.replace("MenuHome");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Animatable.View animation="fadeInUp" duration={1500} delay={0}>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={{ height: 263 * 0.7, width: 369 * 0.7 }}
        />
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        duration={1500}
        delay={200}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontSize: 28, fontWeight: "bold", color: "white", marginTop: 20 }}>
          Create your Account
        </Text>
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        duration={1500}
        delay={400}
        style={styles.input}
      >
        <TextInput
          label="User Name*"
          style={{ backgroundColor: "#bdbdbd00", color: "white" }}
          onChangeText={(string) => {
            txtuserName = string;
          }}
        />
        <TextInput
          label="Email ID*"
          style={{ backgroundColor: "#bdbdbd00" }}
          onChangeText={(string) => {
            txtemail = string;
          }}
        />
        <TextInput
          label="Password*"
          style={{ backgroundColor: "#bdbdbd00" }}
          secureTextEntry={true}
          onChangeText={(string) => {
            txtpassword = string;
          }}
        />
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
        >
          <RadioButton
            value="check"
            status={checked == true ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
            color="blue"
          />
          <Text style={{ color: "#e0e0e0" }}>I Read agree to </Text>
          <TouchableOpacity>
            <Text style={{ color: "red" }}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>

        {/* BUTTON */}
        {isLoading ? 
          <ActivityIndicator  color="white" size="large" />
        : 
          <Button
            mode="contained"
            style={styles.buttonLogin}
            onPress={authSignUp}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>REGISTER</Text>
          </Button>
        }

        <View style={{ alignItems: "center", width: "100%", marginTop: 10 }}>
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 14 }}>
            Or Register using Social Media
          </Text>
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

      <Animatable.View animation="fadeInUp" duration={1500} delay={600}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "white" }}>Alraedy have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.replace("SignIn");
            }}
          >
            <Text style={{ color: "blue", fontWeight: "bold" }}> Login </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroudColor,
  },
  input: {
    backgroundColor: "#bdbdbd50",
    margin: 20,
    padding: 20,
    height: 380,
    width: "90%",
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
    fontWeight: "bold",
  },
  text: {
    color: "white",
  },
});
