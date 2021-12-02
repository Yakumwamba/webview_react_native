import * as React from "react";
import { WebView } from "react-native-webview";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";


function LoadingIndicatorView() {
  return <ActivityIndicator color='#009b88' size='large' />
} 


export default function WebViewLoader({ route, navigation }) {
  //createBottomTabNavigator passes props to navigation.
  // const { url } = navigation.state.params;
  //stackNavigator passes props to route.

const url = "https://www.thutotime.com/";
 
  return (
    <WebView
      source={{
        uri: url,
      }}
      
      renderLoading={LoadingIndicatorView}
      startInLoadingState={true}
    />
  );
}


