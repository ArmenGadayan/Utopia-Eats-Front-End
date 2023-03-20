import { createContext, useState } from "react";
import config from "../services/api.json";
import jwt_decode from "jwt-decode";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

const { manifest } = Constants;

const api = `http://${manifest.debuggerHost.split(":").shift()}:8000`;

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    //   let [user, setUser] = useState(() =>
    //     localStorage.getItem("authTokens")
    //       ? jwt_decode(localStorage.getItem("authTokens"))
    //       : null
    //   );

    const getUserData = () => {
        try {
            const value = AsyncStorage.getItem("authTokens");
            if (value !== null) {
                return jwt_decode(value);
            }
            return null;
        } catch (e) {
            return null;
        }
    };
    let [user, setUser] = useState(getUserData());

    //   let [authTokens, setAuthTokens] = useState(() =>
    //     localStorage.getItem("authTokens")
    //       ? JSON.parse(localStorage.getItem("authTokens"))
    //       : null
    //   );

    const getAuthData = () => {
        try {
            const value = AsyncStorage.getItem("authTokens");
            if (value !== null) {
                return JSON.parse(value);
            }
            return null;
        } catch (e) {
            return null;
        }
    };
    let [authTokens, setAuthTokens] = useState(getAuthData());

    //   let [userProfile, setUserProfile] = useState(() =>
    //     localStorage.getItem("userProfile")
    //       ? JSON.parse(localStorage.getItem("userProfile"))
    //       : null
    //   );

    const getUserProf = () => {
        try {
            const value = AsyncStorage.getItem("userProfile");
            if (value !== null) {
                return JSON.parse(value);
            }
            return null;
        } catch (e) {
            return null;
        }
    };
    let [userProfile, setUserProfile] = useState(getUserProf());

    let loginUser = async (object, navigation, toProfile=false) => {
        //if (!object) e.preventDefault();

        const obj = { password: object.password, username: object.username };

        //   ? object
        //   : {
        //       username: e.target.username.value,
        //       password: e.target.password.value,
        //     };

        try {
            const response = await axios.post(api + "/auth/jwt/create/", obj);

            if (response.status === 200) {
                setAuthTokens(response.data);

                setUser(jwt_decode(response.data.access));
                AsyncStorage.setItem(
                    "authTokens",
                    JSON.stringify(response.data)
                );

                getUserProfile(response.data.access);
                if (toProfile == false) {
                    navigation.navigate("Restaurant List");
                }
                else {
                    navigation.navigate("Profile");
                }
            } else {
                alert("Invalid input placed");
            }
        } catch (err) {
            console.log(`Error: ${err.message}`);
            console.error("Invalid username or password.");
        }
    };

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        setUserProfile(null);
        AsyncStorage.removeItem("authTokens");
        AsyncStorage.removeItem("userProfile");
    };

    let registerUser = async (objectVals, navigation) => {
        let obj = objectVals;
        try {
            const response = await axios.post(api + "/auth/users/", obj);

            if (response.status >= 200 && response.status < 300) {
                const object = {
                    username: obj.username,
                    password: obj.password,
                };
                loginUser(object, navigation, true);
            } else {
                alert("Invalid input placed");
            }
        } catch (err) {
            console.log(`Error: ${err.message}`);
            console.error("Username or email already exists.");
        }
    };

    let getUserProfile = async (token) => {
        try {
            const response = await axios.get(api + "/auth/users/me/", {
                headers: { Authorization: "JWT " + token },
            });
            setUserProfile(response.data);
            AsyncStorage.setItem("userProfile", JSON.stringify(response.data));
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    };

    let contextData = {
        token: authTokens,
        user: user,
        userProfile: userProfile,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
        getUserProfile: getUserProfile,
        getAuthData: getAuthData,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
