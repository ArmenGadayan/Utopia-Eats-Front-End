import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";
import * as RootNavigation from "../utils/RootNavigation";

const NavBar = ({ navigation }) => {
    const [state, setState] = useState({
        username: "",
        password: "",
    });

    const authContext = useContext(AuthContext);

    if (authContext.user === null) {
        return <></>;
    }

    const onPressLogin = () => {
        authContext.loginUser(state, navigation);
    };

    const navigateToProfile = () => {
        RootNavigation.navigate("Profile");
    };

    const navigateToRestaurants = () => {
        RootNavigation.navigate("Restaurant List");
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabName}>
                <TouchableOpacity onPress={navigateToProfile}>
                    <Text style={styles.tab}>Profile</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity onPress={navigateToRestaurants}>
                    <Text style={styles.tab}>Restaurants</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default NavBar;

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: "100%",
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    tabName: {
        padding: 17,
    },
    title: {
        fontWeight: "bold",
        fontSize: 50,
        color: "black",
        marginBottom: 40,
    },
    inputView: {
        width: "80%",
        backgroundColor: "#3AB4BA",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    inputText: {
        height: 50,
        color: "white",
    },
    tab: {
        color: "white",
        fontSize: 15,
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "green",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
    },
});
