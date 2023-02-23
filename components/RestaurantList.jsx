import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import config from "../services/api.json";
import Constants from "expo-constants";
import GoalItem from "./GoalItem";
import RestaurantItem from "./RestaurantItem";
import axios from "axios";

import Device from "expo-device";
import * as Location from "expo-location";

const { manifest } = Constants;

const api = `http://${manifest.debuggerHost
  .split(":")
  .shift()}:8000/api/useritems/?location=`;

const RestaurantList = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [localRestaurants, setLocalRestaurants] = useState([]);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
        api + location.coords.latitude + "," + location.coords.longitude
      );
      setRestaurants(response.data);
      getLocalRestaurants(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getLocation = async () => {
    if (Platform.OS === "android" && !Device.isDevice) {
      setErrorMsg(
        "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
      );
      return;
    }
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
    <View>
      <View style={styles.textBox}>
        <Text style={styles.text}>{"Restaurants"}</Text>
        <FlatList
          data={localRestaurants}
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
    </View>
  );
};

export default RestaurantList;

const styles = StyleSheet.create({
  textBox: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
    alignItems: "center",
  },
  text: {
    color: "white",
    //fontSize: "25px",
  },
});
