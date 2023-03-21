import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";

const RestaurantItem = (props) => {
  return (
    <Pressable 
        onPress={props.onPageChange.bind(this, props.id)}
        style={({pressed}) => pressed && styles.pressedItem}
        >
        <View style={styles.restaurantItem}>
            <Text style={styles.restaurantText}>
                {props.text}
            </Text>
        </View>
    </Pressable>
  )
}

export default RestaurantItem

const styles = StyleSheet.create({
    restaurantItem: {
        margin: 8,
        padding: 20,
        borderRadius: 6,
        backgroundColor: "#A084DC",
        alignItems: "center",
    },
    pressedItem: {
        opacity: 0.5
    },
    restaurantText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
    },
})