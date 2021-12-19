
import React from "react"

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WebViewLoader from "./WebViewLoader";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import IntermediateScreen from "./screens/IntermediateScreen";

import { defineBackgroundTask, unregisterBackgroundFetchAsync } from "./utils/DeviceStatusInfo";
import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Battery from 'expo-battery';
import * as Cellular from 'expo-cellular';
import * as Device from 'expo-device';
import NetInfo from '@react-native-community/netinfo';
import * as Network from 'expo-network';
import { v4 as uuidv4 } from 'uuid';
import * as Location from 'expo-location';
const Stack = createStackNavigator();

// const BackgroundTasks = {
//   Network: "Network",
//   Location: "Location",
//   Battery: "Battery",
//   Cellular: "Cellular",
//   Device: "Device",


// }
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});
const BACKGROUND_FETCH_TASK = 'background-fetch';


// fingerprint of the device

const deviceId = uuidv4();

export default function App() {

  const [isRegistered, setIsRegistered] = React.useState(false);
  const [status, setStatus] = React.useState(null);
  const [executed, setExecuted] = React.useState(false);
  const [geo, setGeo] = React.useState(null);

  // 2. Register the task at some point in your app by providing the same name, and some configuration options for how the background fetch should behave
  // Note: This does NOT need to be in the global scope and CAN be used in your React components!
  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    const now = Date.now();
    const batteryLevel = await Battery.getBatteryLevelAsync();
    const cellular = await Cellular.getCarrierNameAsync()
    const deviceModelName = Device.modelName
    const deviceUptime = await Device.getUptimeAsync()
    const deviceProductName = Device.productName
    const ipAddress = await await Network.getIpAddressAsync();

    const uptime = Math.floor(deviceUptime / 60);
    const uptimeHours = Math.floor(uptime / 60);
    const uptimeMinutes = uptime % 60;
    NetInfo.fetch().then(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
    console.log(`Got background fetch call at date: ${batteryLevel}`);
    console.log(`Cellular: ${cellular}`);
    console.log(`Device Model Name: ${deviceModelName}`);

    console.log(`Device Uptime: ${uptimeHours} hours and ${uptimeMinutes} minutes`);
    console.log(`Device Product name: ${deviceProductName}`);
    console.log(`IP Address: ${ipAddress}`);


    const igu = {
      ip: ipAddress,
      geo: geo

    }
    const deviceData = {
      data: {
        deviceId,
        igu

      }
    }

    console.log("Device information being sent ", deviceData);

    // convert unix timestamp in minutes 
    if (!executed) {

      try {
        var bearer = 'Bearer ' + "0fd76f7e99cb9ca23ddb27747c047871fe708f98cde7ba7a7838e9f7f213ca56bf621eac4d91f616c02c17213f2578116bec6df637a45ba42f63cd426866e4a0a2faa6247d9825ea6d4ce14366959ee123d89f9e37450225c01ee992feffaf94ecd19ff8d03ddf1a300199bef875e6bbdddedd61e2e21514c827fe013af624e5";
        const response = await fetch('https://thutotime-api.herokuapp.com/api/device-data-entries', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': bearer
          },
          body: JSON.stringify(deviceData)
        });
        const responseJson = await response.json();
        console.log(responseJson);
        if (responseJson.status === 200) {
          console.log("Device information sent successfully");
          setExecuted(true);
          unregisterBackgroundFetchAsync();
        }
      }
      catch (error) {
        console.error(error);
      }
    }

    //const content = { title: 'Updating Device information' };
    // const fetchDeviceData = await fetch(
    //   "https://thutotime-api.herokuapp.com/api/device-data-entries",
    //   {
    //     method: "POST",
    //     headers: {
    //       'Accept': "application/json",

    //       'Authentication': "Bearer 0fd76f7e99cb9ca23ddb27747c047871fe708f98cde7ba7a7838e9f7f213ca56bf621eac4d91f616c02c17213f2578116bec6df637a45ba42f63cd426866e4a0a2faa6247d9825ea6d4ce14366959ee123d89f9e37450225c01ee992feffaf94ecd19ff8d03ddf1a300199bef875e6bbdddedd61e2e21514c827fe013af624e5",
    //     },
    //     body: JSON.stringify(deviceData),
    //   }
    // );

    // if (response.status === 200) {
    //   console.log("Device information successfully sent to the server");
    //   console.log(fetchDeviceData.json());
    // } else {
    //   console.log("Device information failed to send to the server");
    //   console.log(fetchDeviceData.json());
    // }


    //Notifications.scheduleNotificationAsync({ content, trigger: null });
    // Be sure to return the successful result type!
    // const data = await fetch(
    //   "https://merchant-app-development.azurewebsites.net/api/notfound-background"
    // );
    // if(data.status === 200){
    //  await unregisterBackgroundFetchAsync();
    //   return BackgroundFetch.BackgroundFetchResult.NewData;
    // }
    // else{
    //   return BackgroundFetch.BackgroundFetchResult.NoData;
    // }


    return BackgroundFetch.BackgroundFetchResult.NewData;

  });
  async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 1, // 15 minutes
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  }

  // 3. (Optional) Unregister tasks by specifying the task name
  // This will cancel any future background fetch calls that match the given name
  // Note: This does NOT need to be in the global scope and CAN be used in your React components!
  async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  }
  // 1. Define the task by providing a name and the function that should be executed
  // Note: This needs to be called in the global scope (e.g outside of your React components)



  React.useEffect(() => {
    //checkStatusAsync();


    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setGeo(location.coords);
      checkStatusAsync();
      console.log(location);
    })();


  }, []);


  const checkStatusAsync = async () => {
    console.log("Checking status...");
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);

    setStatus(status);
    setIsRegistered(isRegistered);

    if (isRegistered && !executed) {
      console.log("Task is registered", BackgroundFetch.BackgroundFetchStatus[status]);
      const data = BackgroundFetch.BackgroundFetchResult.NewData;
      console.log("BackgroundFetchResult", BackgroundFetch.BackgroundFetchStatus[data]);

    } else {
      console.log("Task is not registered", BackgroundFetch.BackgroundFetchStatus[status]);
      await registerBackgroundFetchAsync();
    }
  };

  // const toggleFetchTask = async () => {
  //   if (isRegistered) {
  //     await unregisterBackgroundFetchAsync();
  //   } else {
  //     await registerBackgroundFetchAsync();
  //   }

  //   checkStatusAsync();
  // };
  const BatteryLevelSub = async () => {
    const batteryLevel = await Battery.getBatteryLevelAsync();
    setBatteryLevel(batteryLevel);
    this._subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryLevel(batteryLevel);
      console.log('batteryLevel changed!', batteryLevel);
    });
  };



  return (
    <NavigationContainer >
      <Stack.Navigator headerMode="false">
        <Stack.Screen name="WebViewLoader" component={WebViewLoader} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
