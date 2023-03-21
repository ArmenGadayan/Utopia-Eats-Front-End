import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

const LoginPage = ({ navigation }) => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const authContext = useContext(AuthContext);

  const onPressLogin = () => {
    authContext.loginUser(state, navigation)
  };

  const onPressSignUp = () => {
    navigation.navigate("Sign Up")
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/dddepth-035.png')} style={styles.bgImage}>
        <Image source={require('../assets/uelogo.png')} style={styles.image} />
        <Image source={require('../assets/signin.png')} style={styles.cta} />
        {/* <Text style={styles.title}>Sign in</Text> */}
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setState({ username: text, password: state.password })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setState({ username: state.username, password: text })}
          />
        </View>
        <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressSignUp}>
          <Text style={styles.forgotAndSignUpText}>Signup</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191724",
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#191724",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#e0def4",
    color: "#191724",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#191724",
  },
  forgotAndSignUpText: {
    color: "white",
    fontSize: 14,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#f6c177",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 50,
  },
  cta: {
    width: 165,
    height: 75,
    marginBottom: 50,
  }
});
