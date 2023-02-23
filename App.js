import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, ScrollView, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import RestaurantList from "./components/RestaurantList";


export default function App() {


  return (
    <>
      <StatusBar style="light"/>
      <View style={styles.appContainer}>
        <RestaurantList />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a"
  },
  goalsContainer: {
    flex: 5,
  },
  resetButton: {
    flex: 1,
  }
});
