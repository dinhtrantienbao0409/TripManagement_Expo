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
import UpdateForm from "./UpdateForm";

const db = Database.openDatabase("MainDB");

export default function UpdateTrip({ navigation, route }) {
  const [trips, setTrips] = useState({});

  const id = route.params.id;
  const getDataById = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Trips WHERE id = ?",
          [id],
          (tx, results) => {
            // console.log(
            //   "🚀 ~ file: UpdateTrip.js ~ line 27 ~ tx.executeSql ~ results",
            //   results.rows._array[0]
            // );

            setTrips(results.rows._array[0]);

            // var len = results.rows.length;
            // if (len > 0) {
            //   setTrips(results.rows._array);
            // }
          }
        );
      });
    } catch (error) {
      console.log("🚀 ~ file: Home.js ~ line 32 ~ getData ~ error", error);
    }
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getDataById();
    });
  }, [navigation]);
  return (
    <View>
      <Text>Update Trip</Text>
      <UpdateForm navigation={navigation} trips={trips} />
    </View>
  );
}
