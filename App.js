import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateTrip from "./screens/CreateTrip";
import Home from "./screens/Home";
import UpdateTrip from "./screens/UpdateTrip";

const Stack = createStackNavigator();

export default function App({ navigation }) {
  // const navigateBtn = () => {
  //   navigation.navigate("CreateTrip");
  // };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate("CreateTrip")}
                title="Create Trip"
                color="primary"
              />
            ),
          }}
        />
        <Stack.Screen name="Create Trip" component={CreateTrip} />
        <Stack.Screen name="Update Trip" component={UpdateTrip} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
