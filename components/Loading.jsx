import React from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";

const Loading = () => (
  <View style={styles.loading}>
    <ActivityIndicator size="large" />
    <Text>{"Gathering Personalized Results"}</Text>
  </View>
);

const styles = StyleSheet.create({
  loading: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
