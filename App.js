import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/store";
import { getLocalData } from "./src/util/api";
import TabNavigations from "./src/navigations/TabNavigations";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export default function App() {
  useEffect(() => {
    getLocalData().then((result) => {
      store.dispatch({ type: "loadData", payload: result });
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigations />
      </NavigationContainer>
    </Provider>
  );
}
