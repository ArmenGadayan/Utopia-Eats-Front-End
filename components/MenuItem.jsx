import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
//cccc
const MenuItem = (props) => {
  const { item } = props;
  return (
    <View style={styles.item}>
      <View style={styles.itemNameBox}>
        <Text style={styles.itemName}>{item.item_name} </Text>
      </View>
      <View style={styles.itemInfoBox}>
        <Text style={styles.itemContent}>Cals: {item.calories}</Text>
        {item.protein && <Text style={styles.itemContent}>Protein: {item.protein}g</Text>}
        {item.carbohydrates && <Text style={styles.itemContent}>Carbs: {item.carbohydrates}g</Text>}
        {item.total_fat && <Text style={styles.itemContent}>Fats: {item.total_fat}g</Text>}
      </View>
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 8,
    padding: 8,
    borderRadius: 6,
    color: "#5A5A5A",
    backgroundColor: "#A084DC",
  },
  itemContent: {
    color: "white",
    padding: 5,
  },
  itemNameBox: {
    alignItems: "center",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemInfoBox: {
    flexDirection: "row",
    justifyContent: "center",
  }
});
