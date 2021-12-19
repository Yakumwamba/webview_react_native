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
// const INJECTED_JAVASCRIPT = `(function() {
//   var expires = "";
//   var name = "MoodleSession";
//   var value = "9306e4ee0f812bde371410774b859d18";
//   var days = 30;
//   if (days) {
//       var date = new Date();
//       date.setTime(date.getTime() + (days*24*60*60*1000));
//       expires = "; expires=" + date.toUTCString();
//   }
//   document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  
  
// })();`;
  return (
    <WebView
      source={{
        uri: url,
      }}
      // injectedJavaScript={INJECTED_JAVASCRIPT}
      // onMessage={(event) => {
      //  console.log(event.nativeEvent.data);
      // }}
      renderLoading={LoadingIndicatorView}
      startInLoadingState={true}
    />
  );
}


