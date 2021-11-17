import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import AddProductScreen from "../screens/AddProductScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import EditProductsScreen from "../screens/EditProductsScreen";
import EscanearProductScreen from "../screens/EscanearProductScreen";
import ProductListScreen from "../screens/ProductListScreen";
import RemarcarPrecio from "../screens/RemarcarPrecio";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="CategoriesScreen"
      activeColor="#43E6F7"
      inactiveColor="#ccc"
      barStyle={{ paddingVertical: 4, backgroundColor: "#fff", elevation: 0 }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          switch (route.name) {
            case "CategoriesScreen":
              iconName = "home-outline";
              break;

            case "RemarcarPrecio":
              iconName = "qr-code-outline";
          }

          return <Icon name={iconName} color={color} size={25} />;
        },
      })}
    >
      <Tab.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={{ title: "" }}
      />
      <Tab.Screen
        name="RemarcarPrecio"
        component={RemarcarPrecio}
        options={{ title: "" }}
      />
    </Tab.Navigator>
  );
};

export default function TabNavigations() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ProductListScreen"
        component={ProductListScreen}
        options={{
          title: "",
          headerStyle: { elevation: 0 },
        }}
      />
      <Stack.Screen
        name="EditProductsScreen"
        component={EditProductsScreen}
        options={{
          title: "",
          headerStyle: { elevation: 0 },
        }}
      />
      <Stack.Screen
        name="AddProductScreen"
        component={AddProductScreen}
        options={{
          title: "Agregar Producto",
          headerTitleAlign: "center",
          headerStyle: { elevation: 0 },
        }}
      />
      <Stack.Screen
        name="EscanearProductScreen"
        component={EscanearProductScreen}
        options={{
          headerStyle: { elevation: 0 },
          title: "Escanear",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
