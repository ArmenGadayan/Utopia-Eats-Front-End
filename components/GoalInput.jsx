import { TextInput, View, Button, StyleSheet, Modal, Image } from "react-native"
import { useState } from "react";

const GoalInput = (props) => {
    const [goalText, setGoalText] = useState("");

    const { onAddGoal } = props

    let goalInputHandler = (enteredText) => {
        setGoalText(enteredText);
      };
      
    let addGoalHandler = () => {
        onAddGoal(goalText)
        setGoalText("")
    }

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Image source={require('../assets/images/bullseye.png')} style={styles.image}/>
                <TextInput
                    style={styles.textInput}
                    placeholder="Your Goals"
                    onChangeText={goalInputHandler}
                    value={goalText}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Add Goal" onPress={addGoalHandler} color='#5e0acc'/>
                    </View>
                    <View style={styles.button}>
                        <Button title="Cancel" onPress={props.onCancel} color='#f31282'/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default GoalInput

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: '#31136b'
    },
      textInput: {
        borderWidth: 1,
        borderColor: "#e4d0ff",
        backgroundColor: "#e4d0ff",
        color: "#128438",
        borderRadius: 6,
        width: "100%",
        padding: 17,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 8,
    },
    button: {
        width: '30%',
        marginHorizontal: 8,
    },
    image: {
        width: 100,
        height: 100,
        margin: 100,
    },
})