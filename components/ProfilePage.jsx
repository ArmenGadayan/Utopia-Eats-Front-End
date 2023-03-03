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
} from "react-native";
import axios from "axios";

const ProfilePage = ({ navigation }) => {
  const authContext = useContext(AuthContext);

  const [profile, setProfile] = useState(authContext.userProfile);

  const onPressLogout = () => {
    authContext.logoutUser();
    navigation.navigate("Login")
  };

  const onPressUpdate = () => {
    
  };

  return (
    <View style={styles.container}>
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
          placeholder={profile.height_feet.toString()}
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
          placeholder={profile.height_inches.toString()}
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
          placeholder={profile.weight.toString()}
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
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5e0acc",
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
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "black",
    marginBottom: 15,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#3AB4BA",
    borderRadius: 25,
    height: 50,
    marginBottom: 10,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgotAndSignUpText: {
    color: "white",
    fontSize: 11,
  },
  updateBtn: {
    width: "80%",
    backgroundColor: "green",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  logoutBtn: {
    width: "80%",
    backgroundColor: "red",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});
