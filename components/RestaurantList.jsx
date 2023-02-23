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
import axios from "axios";

const { manifest } = Constants;

const api = `http://${manifest.debuggerHost
  .split(":")
  .shift()}:8000/api/restaurants/`;

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
      const response = await axios.get(api);
      setRestaurants(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  let junk = () => {
    return 0
  }

  return (
    <View>
      <View style={styles.textBox}>
        <Text style={styles.text}>{"Restaurants"}</Text>
        <FlatList 
            data={restaurants} 
            renderItem={itemData => {
              return <GoalItem 
                        text={itemData.item.restaurant_name} 
                        id={itemData.item.id}
                        onDeleteItem={junk}/>
            }}
            keyExtractor={(item, index) => {
              return item.id
            } }  
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
    fontSize: "25px",
  },
});
