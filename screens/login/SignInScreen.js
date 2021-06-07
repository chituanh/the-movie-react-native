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
import { Avatar, Button, TextInput } from "react-native-paper";
import Colors from "../../constants/Colors";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

var _txtTaiKhoan = "";
var _txtMatKhau = "";

const SignInScreen = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (error) {
      Alert.alert("Notification!!!", error, [{ text: "YES" }]);
    }
  }, [error]);

  const authSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(authActions.login(_txtTaiKhoan, _txtMatKhau));
      props.navigation.replace("MenuHome");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Animatable.View animation="fadeInUp" duration={1500} delay={0}>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={{ height: 263 * 0.65, width: 369 * 0.65 }}
        />
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        duration={1500}
        delay={200}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Text
          style={{
            fontStyle: "normal",
            color: "white",
            fontSize: 23,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          Sign into your Account
        </Text>
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        duration={1500}
        delay={400}
        style={styles.input}
      >
        <TextInput
          onChangeText={(text) => (_txtTaiKhoan = text)}
          label="Email ID*"
          style={{ backgroundColor: "#bdbdbd00" }}
        />
        <TextInput
          onChangeText={(text) => (_txtMatKhau = text)}
          label="Password*"
          style={{ backgroundColor: "#bdbdbd00" }}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Text style={styles.textQuenMatKhau}>Forgot Password?</Text>
        </TouchableOpacity>
        <View>
          {isLoading ? (
            <ActivityIndicator color="white" size="large" />
          ) : (
            <Button
              mode="contained"
              style={styles.buttonLogin}
              onPress={authSignIn}
            >
              LOGIN
            </Button>
          )}
        </View>

        <View style={{ alignItems: "center", width: "100%", marginTop: 10 }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Or Login using Social Madia
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
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Don't have on account! 
          </Text>
          <TouchableOpacity
            onPress={() => {
              console.log(props.navigation.replace("SignUp"));
            }}
          >
            <Text style={{ color: "blue", fontWeight: "bold" }}>
              Register Now
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

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
    height: 310,
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
  },
});
