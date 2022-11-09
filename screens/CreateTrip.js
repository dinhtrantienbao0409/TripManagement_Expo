import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  Button,
  Alert,
} from "react-native";
import * as Database from "expo-sqlite";

const db = Database.openDatabase("MainDB");

export default function CreateTrip({ navigation }) {
  const [trips, setTrips] = useState("");
  const [destinations, setDestinations] = useState("");
  const [date, setDate] = useState("");
  const [risks, setRisks] = useState("");
  const [descriptions, setDescriptions] = useState("");

  useEffect(() => {
    createTables();
    // getData();
  }, []);

  const createTables = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS " +
          "Trips " +
          "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Destination TEXT, Date TEXT, Risk TEXT, Descriptions TEXT);"
      );
    });
  };

  const getData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT Name, Destination, Date, Risk, Descriptions FROM Trips ",
          [],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              navigation.navigate("Home");
            }
          }
        );
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: CreateTrip.js ~ line 71 ~ getData ~ error",
        error
      );
    }
  };

  const setData = () => {
    if (
      trips.length == 0 ||
      destinations.length == 0 ||
      date.length == 0 ||
      descriptions.length == 0
    ) {
      Alert.alert("You must fill all required fields!");
    } else {
      try {
        db.transaction((tx) => {
          tx.executeSql(
            "INSERT INTO Trips (Name, Destination, Date, Risk, Descriptions) VALUES (?,?,?,?,?)",
            [trips, destinations, date, risks, descriptions]
          );
        });
        navigation.navigate("Home");
      } catch (error) {
        console.log(
          "🚀 ~ file: CreateTrip.js ~ line 64 ~ setData ~ error",
          error
        );
      }
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" />
      <Text style={styles.label}>Trip Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter trip name"
        value={trips}
        onChangeText={setTrips}
      />
      <Text style={styles.label}>Trip Destination:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter trip destinations"
        value={destinations}
        onChangeText={setDestinations}
      />
      <Text style={styles.label}>Trip Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter trip date"
        value={date}
        onChangeText={setDate}
      />
      <Text style={styles.label}>Risk Required Assessment:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter trip risk"
        value={risks}
        onChangeText={setRisks}
      />
      <Text style={styles.label}>Trip Descriptions:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter trip descriptions"
        value={descriptions}
        onChangeText={setDescriptions}
      />
      <Button title="Create" onPress={() => setData()} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  label: {
    marginLeft: 12,
    fontWeight: "bold",
  },
});
