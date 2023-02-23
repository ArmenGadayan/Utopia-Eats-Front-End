import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import RestaurantList from "./components/RestaurantList";
import RestaurantPage from "./components/RestaurantPage";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Restaurant List" component={RestaurantList} />
            <Stack.Screen name="Restaurant" component={RestaurantPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
  },
  goalsContainer: {
    flex: 5,
  },
  resetButton: {
    flex: 1,
  },
});
