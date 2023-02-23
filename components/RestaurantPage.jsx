import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
import MenuItem from "./MenuItem";

const RestaurantPage = ({ navigation, route }) => {
  return (
    <View>
      <Text style={styles.restaurantName}>
        {route.params.restaurant_items[0].restaurant_name}
      </Text>
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
    color: "black",
  },
});
