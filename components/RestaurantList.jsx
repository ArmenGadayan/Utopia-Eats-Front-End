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
const { manifest } = Constants;

const api = `http://${manifest.debuggerHost.split(':').shift()}:8000/api/restaurants/`

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  let printTest = () => {
    if (restaurants.length == 0) {
      return <Text style={styles.text}>{"Nothing"}</Text>;
    }
    return <Text style={styles.text}>{restaurants.fact}</Text>;
  };

  const getRestaurants = async () => {
    try {
      console.log(api)
      const response = await fetch(api);
      console.log(("here we wait"))
      const json = await response.json();
      console.log("worked")
      setRestaurants(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <View style={styles.textBox}>
        <Text style={styles.text}>{"Restaurants"}</Text>
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
    fontSize: "25px",
  },
});
