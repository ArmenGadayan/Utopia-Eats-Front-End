import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, ScrollView, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  let startAddGoalHandler = () => {
    setModalIsVisible(true)
  }

  let endGoalHandler = () => {
    setModalIsVisible(false)
  }  

  let addGoalHandler = (goalText) => {
    setCourseGoals((courseGoals) => [
      ...courseGoals, 
      {text: goalText, id: Math.random().toString()},
    ]);
    setModalIsVisible(false)
  };

  let deleteGoalHandler = (id) => {
    setCourseGoals((courseGoals) => {
      return courseGoals.filter((goal) => goal.id !== id)  
    })
  }

  return (
    <>
      <StatusBar style="light"/>
      <View style={styles.appContainer}>
        <Button 
          title="Add New Goal" 
          color="#5e0acc"
          onPress={startAddGoalHandler} 
        />
        <GoalInput 
          onAddGoal={addGoalHandler} 
          onCancel={endGoalHandler}
          visible={modalIsVisible}/>
        <View style={styles.goalsContainer}>
          <FlatList 
            data={courseGoals} 
            renderItem={itemData => {
              return <GoalItem 
                        text={itemData.item.text} 
                        id={itemData.item.id}
                        onDeleteItem={deleteGoalHandler}/>
            }}
            keyExtractor={(item, index) => {
              return item.id
            } }  
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a"
  },
  goalsContainer: {
    flex: 5,
  },
  resetButton: {
    flex: 1,
  }
});
