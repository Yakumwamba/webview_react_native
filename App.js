

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WebViewLoader from "./WebViewLoader";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import IntermediateScreen from "./screens/IntermediateScreen";
import React from "react"


// function HomeScreen({ navigation }) {
//   var url = "https://thutotime.com";
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button
//         title="Start Thuto Time"
//         onPress={() => navigation.navigate("WebView", { url: url })}
//       />
//     </View>
//   );
// }
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator  headerMode="false">
        <Stack.Screen name="LoginScreen" component={LoginScreen}  />
        <Stack.Screen name="HomeScreen" component={HomeScreen}  />
        <Stack.Screen name="IntermediateScreen" component={IntermediateScreen}  />
      </Stack.Navigator>
  
    </NavigationContainer>
  );
}
