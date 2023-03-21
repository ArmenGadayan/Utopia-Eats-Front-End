import React, { useState, useEffect, useContext } from "react";
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
  ImageBackground,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;
const api = `http://${manifest.debuggerHost.split(":").shift()}:8000`;

const ProfilePage = ({ navigation }) => {
  const authContext = useContext(AuthContext);

  const [profile, setProfile] = useState({});

  useEffect(() => {
    getUserProfile(authContext.token.access)
  }, []);

  let getUserProfile = async (token) => {
    try {
      const response = await axios.get(api + "/auth/users/me/", {
        headers: { Authorization: "JWT " + token },
      });
      setProfile(response.data);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const onPressLogout = () => {
    authContext.logoutUser();
    navigation.navigate("Login")
  };

  const onPressUpdate = async () => {
    try {
      await axios.put(api + "/auth/users/me/", profile, {
        headers: { Authorization: "JWT " + authContext.token.access },
      });
    } catch (err) {
      console.log(`Error: ${err.message}`);
      console.error("Invalid info.");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/dddepth-346.jpg')} style={styles.bgImage}>
        <Text style={styles.title}> Profile</Text>

        <Text style={styles.infoType}>{"First Name"}</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder={profile.first_name}
            placeholderTextColor="#003f5c"
            onChangeText={(text) =>
              setProfile((prevState) => ({ ...prevState, first_name: text }))
            }
          />
        </View>

        <Text style={styles.infoType}>{"Last Name"}</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder={profile.last_name}
            placeholderTextColor="#003f5c"
            onChangeText={(text) =>
              setProfile((prevState) => ({ ...prevState, last_name: text }))
            }
          />
        </View>

        <Text style={styles.infoType}>{"Height Feet"}</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder={profile.height_feet != null ? profile.height_feet.toString() : "N/A"}
            placeholderTextColor="#003f5c"
            onChangeText={(text) =>
              setProfile((prevState) => ({
                ...prevState,
                height_feet: parseInt(text, 10),
              }))
            }
          />
        </View>

        <Text style={styles.infoType}>{"Inches"}</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder={profile.height_inches != null ? profile.height_inches.toString() : "N/A"}
            placeholderTextColor="#003f5c"
            onChangeText={(text) =>
              setProfile((prevState) => ({
                ...prevState,
                height_inches: parseInt(text, 10),
              }))
            }
          />
        </View>

        <Text style={styles.infoType}>{"Weight (lbs)"}</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder={profile.weight != null ? profile.weight.toString() : "N/A"}
            placeholderTextColor="#003f5c"
            onChangeText={(text) =>
              setProfile((prevState) => ({
                ...prevState,
                weight: parseInt(text, 10),
              }))
            }
          />
        </View>

        <TouchableOpacity onPress={onPressUpdate} style={styles.updateBtn}>
          <Text style={styles.loginText}>Update </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressLogout} style={styles.logoutBtn}>
          <Text style={styles.loginText}>Logout </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default ProfilePage;

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
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  infoType: {
    fontSize: 20,
    color: "#e0def4",
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#e0def4",
    marginBottom: 15,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#e0def4",
    borderRadius: 25,
    height: 50,
    marginBottom: 10,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#191724",
  },
  forgotAndSignUpText: {
    color: "#191724",
    fontSize: 11,
  },
  updateBtn: {
    width: "80%",
    backgroundColor: "#9ccfd8",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  logoutBtn: {
    width: "80%",
    backgroundColor: "#eb6f92",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});
