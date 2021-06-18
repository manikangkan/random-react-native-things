import React from "react";
import AppLoading from "expo-app-loading";
import Drawer from "./src/navigations/Drawer";

import * as Font from "expo-font";
const fetchFont = () => {
  return Font.loadAsync({
    bold: require("./assets/fonts/poppins-bold.ttf"),
    semibold: require("./assets/fonts/poppins-semibold.ttf"),
    medium: require("./assets/fonts/poppins-medium.ttf"),
    regular: require("./assets/fonts/poppins-regular.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  return !fontLoaded ? (
    <AppLoading
      startAsync={fetchFont}
      onError={() => console.warn("Loading font...")}
      onFinish={() => {
        setFontLoaded(true);
      }}
    />
  ) : (
    <Drawer />
  );
}
