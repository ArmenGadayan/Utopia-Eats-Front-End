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

const SignUpPage = ({ navigation }) => {
  const [state, setState] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const authContext = useContext(AuthContext);

  const onPressLogin = () => {
    authContext.registerUser(state, navigation)
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/dddepth-239.jpg')} style={styles.bgImage}>
        <Image source={require('../assets/uelogo.png')} style={styles.image} />
        <Image source={require('../assets/signup.png')} style={styles.cta} />
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setState(prevState => ({ ...prevState, username: text }))}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setState(prevState => ({ ...prevState, email: text }))}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="First Name"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setState(prevState => ({ ...prevState, first_name: text }))}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Last Name"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setState(prevState => ({ ...prevState, last_name: text }))}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setState(prevState => ({ ...prevState, password: text }))}
          />
        </View>
        <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
          <Text style={styles.loginText}>Register </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default SignUpPage;

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
    color: "#e0def4",
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
    backgroundColor: "#eb6f92",
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
    margin: 20,
  },
  cta: {
    width: 170,
    height: 75,
    marginBottom: 50,
  }
});
