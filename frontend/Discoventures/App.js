/* eslint-disable no-undef */
import * as React from "react";
import { Provider } from "react-redux";
import store from "./src/app/store/store";
import AppHome from "./App_home";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Raleway-Bold": require("./assets/fonts/Raleway/Raleway-Bold.ttf"),
    "Raleway-SemiBold": require("./assets/fonts/Raleway/Raleway-SemiBold.ttf"),
    "Raleway-Medium": require("./assets/fonts/Raleway/Raleway-Medium.ttf"),
    "Raleway-Regular": require("./assets/fonts/Raleway/Raleway-Regular.ttf"),
    "CantoraOne-Regular": require("./assets/fonts/Cantora/CantoraOne-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <AppHome />
    </Provider>
  );
}
