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
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import * as Database from "expo-sqlite";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

const db = Database.openDatabase("MainDB");

export default function Home({ navigation }) {
  const [trips, setTrips] = useState([]);
  const [showBox, setShowBox] = useState(true);

  const getData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM Trips ", [], (tx, results) => {
          // console.log(
          //   "🚀 ~ file: Home.js ~ line 58 ~ db.transaction ~ results",
          //   results.rows._array
          // );
          var len = results.rows.length;
          if (len > 0) {
            setTrips(results.rows._array);
          }
        });
      });
    } catch (error) {
      console.log("🚀 ~ file: Home.js ~ line 32 ~ getData ~ error", error);
    }
  };

  const deleteData = (id) => {
    console.log("🚀 ~ file: Home.js ~ line 48 ~ deleteData ~ id", id);
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM Trips WHERE id = ? ",
          [id],
          (tx, results) => {
            console.log(
              "🚀 ~ file: Home.js ~ line 55 ~ db.transaction ~ results.rowsAffected",
              results
            );
          }
        );
      });
    } catch (error) {
      console.log("🚀 ~ file: Home.js ~ line 60 ~ deleteData ~ error", error);
    }
  };

  const confirmDialog = (id) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this trip?",
      [
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            setShowBox(false);
            deleteData(id);
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          },
        },
      ]
    );
  };

  const Item = ({ trip, destination, date, risk, description, id }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("Update Trip", { id: id })}
    >
      <View
        style={{ flex: 1, flexDirection: "row", alignItems: "space-between" }}
      >
        <Text style={styles.tripName}>{trip}</Text>

        <MaterialIcons
          name="delete"
          size={24}
          color="black"
          onPress={() => {
            confirmDialog(id);
          }}
        />
      </View>
      <Text style={styles.titleView}></Text>

      <Text style={styles.infoView}>
        <Entypo name="location" size={24} color="black" />
        <Text style={styles.tripDestination}> Location: {destination}</Text>
      </Text>
      <Text style={styles.infoView}>
        <MaterialIcons name="date-range" size={24} color="black" />
        <Text style={styles.tripDestination}> Date: {date}</Text>
      </Text>
      <Text style={styles.infoView}>
        <Entypo name="warning" size={24} color="black" />
        <Text style={styles.tripDestination}> Risk Assessment: {risk}</Text>
      </Text>
      <Text style={styles.infoView}>
        <Entypo name="pencil" size={24} color="black" />
        <Text style={styles.tripDestination}> Descriptions: {description}</Text>
      </Text>
    </TouchableOpacity>
  );

  //example flatList

  // const renderItemExample = ({ item }) => <Item title={item.title} />;
  //

  const renderItem = ({ item }) => (
    <Item
      trip={item["Name"]}
      destination={item["Destination"]}
      date={item["Date"]}
      risk={item["Risk"]}
      description={item["Descriptions"]}
      id={item["ID"]}
    />
  );

  useEffect(() => {
    navigation.addListener("focus", () => {
      getData();
    });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={trips}
        renderItem={renderItem}
        keyExtractor={(item) => item["ID"]}
      />

      <Button
        title="Create New Trip"
        onPress={() => navigation.navigate("Create Trip")}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#d3d3d3",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },

  tripName: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    flex: 3,
  },
  tripDestination: {
    fontSize: 20,
  },
  infoView: {
    marginLeft: 20,
    padding: 5,
  },
  titleView: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
});
