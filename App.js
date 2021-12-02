import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WebViewLoader from "./WebViewLoader";
import { Button, View } from "react-native";

function HomeScreen({ navigation }) {
  var url = "https://thutotime.com";
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Start Thuto Time"
        onPress={() => navigation.navigate("WebView", { url: url })}
      />
    </View>
  );
}
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator  headerMode="false">
        <Stack.Screen name="WebViesdsdw" component={WebViewLoader}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
