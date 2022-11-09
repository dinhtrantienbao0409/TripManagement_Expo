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
  Platform,
} from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-date-picker";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

import * as Database from "expo-sqlite";

const db = Database.openDatabase("MainDB");

export default function CreateTrip({ navigation }) {
  const [trips, setTrips] = useState("");
  const [destinations, setDestinations] = useState("");
  const [risks, setRisks] = useState("");
  const [descriptions, setDescriptions] = useState("");

  const [date, setDate] = useState("");
  const [datePicker, setDatePicker] = useState(true);
  const [text, setText] = useState("");

  var risk = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const hideDatePicker = () => {
    setDatePicker(false);
  };

  const onDateSelected = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log(
      "🚀 ~ file: CreateTrip.js ~ line 47 ~ onDateSelected ~ currentDate",
      currentDate.toLocaleDateString()
    );

    setDate(currentDate.toLocaleDateString());
    // let tempDate = new Date(currentDate);
    // console.log(
    //   "🚀 ~ file: CreateTrip.js ~ line 54 ~ onDateSelected ~ tempDate",
    //   tempDate.toLocaleDateString()
    // );

    // let fDate =
    //   tempDate.getDate() +
    //   "-" +
    //   (tempDate.getMonth() + 1) +
    //   "-" +
    //   tempDate.getFullYear();
    // console.log(
    //   "🚀 ~ file: CreateTrip.js ~ line 53 ~ onDateSelected ~ fDate",
    //   fDate
    // );
    setText(currentDate.toLocaleDateString());
  };

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

  // const getData = () => {
  //   try {
  //     db.transaction((tx) => {
  //       tx.executeSql(
  //         "SELECT Name, Destination, Date, Risk, Descriptions FROM Trips ",
  //         [],
  //         (tx, results) => {
  //           var len = results.rows.length;
  //           if (len > 0) {
  //             navigation.navigate("Home");
  //           }
  //         }
  //       );
  //     });
  //   } catch (error) {
  //     console.log(
  //       "🚀 ~ file: CreateTrip.js ~ line 71 ~ getData ~ error",
  //       error
  //     );
  //   }
  // };

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
        // navigation.navigate("Home");
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
      {/* {!datePicker && ( */}
      <View></View>
      {/* )} */}
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
      <Text style={styles.label}>Trip Date: </Text>
      <View style={styles.tripDate}>
        <TextInput
          style={styles.input}
          placeholder="Enter trip date"
          value={date}
          editable={false}
          selectTextOnFocus={false}
          onChangeText={setDate}
        />

        <MaterialIcons
          name="date-range"
          size={24}
          color="black"
          onPress={() => hideDatePicker()}
        />
      </View>
      {datePicker && (
        <DateTimePicker
          value={new Date()}
          mode={"date"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={true}
          onChange={onDateSelected}
        />
      )}

      <Text style={styles.label}>Risk Required Assessment:</Text>
      <RadioForm
        style={styles.radioForm}
        radio_props={risk}
        onPress={(value) => setRisks(value)}
        buttonColor={"black"}
        buttonSize={20}
        selectedButtonColor={"black"}
      />
      <Text style={styles.label}>Trip Descriptions:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter trip descriptions"
        value={descriptions}
        onChangeText={setDescriptions}
      />
      <Button
        title="Create"
        onPress={() => {
          setData();
          navigation.navigate("Home");
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  label: {
    marginLeft: 12,
    fontWeight: "bold",
  },
  radioForm: {
    margin: 12,
  },
  tripDate: {
    flexDirection: "row",
    alignItems: "baseline",
  },
});
