import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import config from "../services/api.json";
import Constants from "expo-constants";
import GoalItem from "./GoalItem";
import RestaurantItem from "./RestaurantItem";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import Device from "expo-device";
import * as Location from "expo-location";
import Loading from "./Loading";

const { manifest } = Constants;

const api = `http://${manifest.debuggerHost
  .split(":")
  .shift()}:8000/api/useritems/?location=`;

const RestaurantList = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [localRestaurants, setLocalRestaurants] = useState([]);

  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [fetch,setFetch] = useState(false)

  const authContext = useContext(AuthContext);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      getRestaurants();
    }
  }, [location]);

  let getLocalRestaurants = (data) => {
    const uniqueRestaurants = [
      ...new Map(data.map((v) => [v.restaurant_id, v])).values(),
    ];
    setLocalRestaurants(uniqueRestaurants);
  };

  const getRestaurants = async () => {
    try {
      const response = await axios.get(
        api + location.coords.latitude + "," + location.coords.longitude,
        {
          headers: { Authorization: "JWT " + authContext.token.access },
        }
      );
      setRestaurants(response.data);
      getLocalRestaurants(response.data);
      setLoading(false);
      setFetch(fetch)
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = () => {
    setFetch(true)
    getRestaurants()
}

  const getLocation = async () => {
    // if (Platform.OS === "android" && !Device.isDevice) {
    //   setErrorMsg(
    //     "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
    //   );
    //   return;
    // }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  let onHandlePageChange = (id) => {
    const chosenRestaurantItems = restaurants.filter((restaurant) => {
      return restaurant.restaurant_id === id;
    });
    navigation.navigate("Restaurant", {
      restaurant_id: id,
      restaurant_items: chosenRestaurantItems,
    });
  };

  return (
    <View style={styles.page}>
      <View style={styles.title}>
        <Text style={styles.text}>{"Restaurants"}</Text>
      </View>

      {loading && <Loading/>}

      <FlatList
        data={localRestaurants}
        onRefresh={() => onRefresh()}
        refreshing={fetch}
        renderItem={(itemData) => {
          return (
            <RestaurantItem
              text={itemData.item.restaurant_name}
              id={itemData.item.restaurant_id}
              onPageChange={onHandlePageChange}
            />
          );
        }}
        keyExtractor={(item, index) => {
          return item.id;
        }}
      />
    </View>
  );
};

export default RestaurantList;

const styles = StyleSheet.create({
  textBox: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 40,
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    fontSize: 24,
    marginTop: 50,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#898AA6"
  },
  page: {
    height: "100%",
  }
});
