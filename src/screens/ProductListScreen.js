import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { Title } from "react-native-paper";
import SearchableList from "../components/SearchableList";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function ProductListScreen({ route }) {
  const navigation = useNavigation();
  const { categoryName, id } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Title>{categoryName}</Title>,
      headerTitleAlign: "center",
      headerRight: () => (
        <TouchableOpacity
          style={styles.buttonAdd}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("AddProductScreen", id)}
        >
          <Icon type="material-community" name="plus" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const productos = useSelector((state) => state.productosReducer.data);

  const findProductList = productos.filter(
    (producto) => id === producto.idCategoria
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.viewContainer}>
        <SearchableList productos={findProductList} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  title: {
    marginTop: 15,
    textAlign: "center",
  },
  inputForm: {
    width: "100%",
    marginTop: 30,
  },
  card: {
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 10,
    alignSelf: "center",
  },
  price: {
    textAlignVertical: "center",
    marginRight: 5,
  },
  nameProduct: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonAdd: {
    right: 16,
    borderRadius: 100,
    padding: 1,
    borderWidth: 2,
    backgroundColor: "#fff",
  },
});
