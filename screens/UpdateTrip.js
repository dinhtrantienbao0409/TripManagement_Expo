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

export default function UpdateTrip() {
  const [trips, setTrips] = useState("");
  const [destinations, setDestinations] = useState("");
  const [date, setDate] = useState("");
  const [risks, setRisks] = useState("");
  const [descriptions, setDescriptions] = useState("");

  return (
    <View>
      <Text>Update Trip</Text>
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
        <Button title="Update Trip" />
      </View>
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
