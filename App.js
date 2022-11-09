import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import CreateTrip from "./screens/CreateTrip";
import Home from "./screens/Home";
import UpdateTrip from "./screens/UpdateTrip";

const Stack = createStackNavigator();

export default function App({ navigation }) {
  // const navigateBtn = () => {
  //   navigation.navigate("CreateTrip");
  // };
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Create Trip" component={CreateTrip} />
          <Stack.Screen name="Update Trip" component={UpdateTrip} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
