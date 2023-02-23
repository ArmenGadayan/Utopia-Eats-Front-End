import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";

const MenuItem = (props) => {
    const {item} = props
  return (
    <View style={styles.item}>
      <Text style={styles.itemContent}>{item.item_name} {item.calories}</Text>
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  item: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    color: "#5A5A5A",
  },
  itemContent: {
    color: "black",
  },
});
