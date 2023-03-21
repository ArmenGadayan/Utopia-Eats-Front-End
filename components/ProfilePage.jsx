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
import RadioGroup from "react-native-radio-buttons-group";

const { manifest } = Constants;
const api = `http://${manifest.debuggerHost.split(":").shift()}:8000`;

const ProfilePage = ({ navigation }) => {
  const authContext = useContext(AuthContext);

  const [profile, setProfile] = useState({});

  const [sexOptions, setSexOptions] = useState([
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "Male",
      value: "Male",
      selected: false,
      color: "#e0def4",
      labelStyle: styles.radio,
    },
    {
      id: "2",
      label: "Female",
      value: "Female",
      selected: false,
      color: "#e0def4",
      labelStyle: styles.radio
    },
  ]);

  let onPressSex = (radioButtonsArray) => {
    let result = radioButtonsArray.filter(
      (option) => option.selected === true
    )[0];
    setProfile((prevState) => ({ ...prevState, sex: result.value }));
    setSexOptions(radioButtonsArray);
  };

  const [activityLevelOptions, setActivityLevelOptions] = useState([
    {
      id: "1", label: "Low", value: 1.2, selected: false,
      color: "#e0def4",
      labelStyle: styles.radio
    },
    {
      id: "2", label: "Moderate", value: 1.55, selected: false,
      color: "#e0def4",
      labelStyle: styles.radio
    },
    {
      id: "3", label: "High", value: 1.9, selected: false,
      color: "#e0def4",
      labelStyle: styles.radio
    },
  ]);

  let onPressActivityLevel = (radioButtonsArray) => {
    let result = radioButtonsArray.filter(
      (option) => option.selected === true
    )[0];
    setProfile((prevState) => ({ ...prevState, activity_level: result.value }));
    setActivityLevelOptions(radioButtonsArray);
  };

  const [goalOptions, setGoalOptions] = useState([
    {
      id: "1", label: "Lose Weight", value: "Lose", selected: false,
      color: "#e0def4",
      labelStyle: styles.radio
    },
    {
      id: "2", label: "Maintain Weight", value: "Maintain", selected: false,
      color: "#e0def4",
      labelStyle: styles.radio
    },
    {
      id: "3", label: "Gain Weight", value: "Gain", selected: false,
      color: "#e0def4",
      labelStyle: styles.radio
    },
  ]);

  let onPressGoal = (radioButtonsArray) => {
    let result = radioButtonsArray.filter(
      (option) => option.selected === true
    )[0];
    setProfile((prevState) => ({ ...prevState, goal: result.value }));
    setGoalOptions(radioButtonsArray);
  };

  useEffect(() => {
    getUserProfile(authContext.token.access);
  }, []);

  let getUserProfile = async (token) => {
    try {
      const response = await axios.get(api + "/auth/users/me/", {
        headers: { Authorization: "JWT " + token },
      });
      setProfile(response.data);
      let sex = response.data.sex
      let activity_level = response.data.activity_level
      let weight_goal = response.data.goal


      let newSexOptions = sexOptions.map(option => { if (option.value === sex) { option["selected"] = true } return option })
      setSexOptions(newSexOptions)

      let newActivityLevelOptions = activityLevelOptions.map(option => { if (option.value === activity_level) { option["selected"] = true } return option })
      setActivityLevelOptions(newActivityLevelOptions)

      let newGoalOptions = goalOptions.map(option => { if (option.value === weight_goal) { option["selected"] = true } return option })
      setGoalOptions(newGoalOptions)

    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const onPressLogout = () => {
    authContext.logoutUser();
    navigation.navigate("Login");
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
    <View>
      <ScrollView>
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
                placeholder={
                  profile.height_feet != null
                    ? profile.height_feet.toString()
                    : "N/A"
                }
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
                placeholder={
                  profile.height_inches != null
                    ? profile.height_inches.toString()
                    : "N/A"
                }
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
                placeholder={
                  profile.weight != null ? profile.weight.toString() : "N/A"
                }
                placeholderTextColor="#003f5c"
                onChangeText={(text) =>
                  setProfile((prevState) => ({
                    ...prevState,
                    weight: parseInt(text, 10),
                  }))
                }
              />
            </View>

            <Text style={styles.infoType}>{"Age"}</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder={profile.age != null ? profile.age.toString() : "N/A"}
                placeholderTextColor="#003f5c"
                onChangeText={(text) =>
                  setProfile((prevState) => ({
                    ...prevState,
                    age: parseInt(text, 10),
                  }))
                }
              />
            </View>

            <Text style={styles.infoType}>{"Sex"}</Text>
            <RadioGroup radioButtons={sexOptions} onPress={onPressSex} containerStyle={styles.radioContainer} />

            <Text style={styles.infoType}>{"Activity Level"}</Text>
            <RadioGroup radioButtons={activityLevelOptions} onPress={onPressActivityLevel} containerStyle={styles.radioContainer} />

            <Text style={styles.infoType}>{"Weight Goal"}</Text>
            <RadioGroup radioButtons={goalOptions} onPress={onPressGoal} containerStyle={styles.radioContainer} />

            <View style={styles.buttons}>
              <TouchableOpacity onPress={onPressUpdate} style={styles.updateBtn}>
                <Text style={styles.loginText}>Update </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressLogout} style={styles.logoutBtn}>
                <Text style={styles.loginText}>Logout </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
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
    alignItems: "left",
    justifyContent: "center",
    padding: 20,

  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "left",
    justifyContent: "center",
  },
  infoType: {
    fontSize: 18,
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 5,
    color: "#e0def4",
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#e0def4",
    marginBottom: 15,
    marginTop: 100,
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
  buttons: {
    justifyContent: "center",
    width: 400,
  },
  radioContainer: {
    alignItems: "left",
  },
  radio: {
    color: "#e0def4"
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

  dropDown: {
    marginTop: 15,
  },
});