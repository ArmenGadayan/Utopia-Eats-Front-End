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
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import ProfilePage from "./components/ProfilePage";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";

import { navigationRef } from "./utils/RootNavigation";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AuthProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Sign Up" component={SignUpPage} />
            <Stack.Screen
              name="Profile"
              component={ProfilePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Restaurant List" component={RestaurantList} />
            <Stack.Screen name="Restaurant" component={RestaurantPage} />
          </Stack.Navigator>
          <NavBar />
        </NavigationContainer>
      </AuthProvider>
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
