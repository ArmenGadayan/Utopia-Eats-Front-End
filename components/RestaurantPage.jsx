import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
import MenuItem from "./MenuItem";

const RestaurantPage = ({ navigation, route }) => {
  return (
    <View>
      <View style={styles.title}>
        <Text style={styles.restaurantName}>
          {route.params.restaurant_items[0].restaurant_name}
        </Text>
      </View>
      <FlatList
        data={route.params.restaurant_items}
        renderItem={(itemData) => {
          return <MenuItem item={itemData.item} />;
        }}
        keyExtractor={(item, index) => {
          return item.id;
        }}
      />
    </View>
  );
};

export default RestaurantPage;

const styles = StyleSheet.create({
  restaurantName: {
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
    borderRadius: 6,
    backgroundColor: "#3b3b3b"
  },
});
