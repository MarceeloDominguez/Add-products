import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import ProductList from "./ProductList";

export default function SearchableList({ productos }) {
  const [searchField, setSearchField] = useState("");

  const filteredProducts = productos.filter((item) => {
    return item.nombre.toLowerCase().includes(searchField.toLowerCase());
  });

  const onchange = (e) => {
    setSearchField(e.nativeEvent.text);
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Buscar producto..."
          style={styles.input}
          onChange={onchange}
        />
        <Icon
          type="material-community"
          name="magnify"
          containerStyle={{ position: "absolute", right: 10, top: 20 }}
          color="#ccc"
        />
      </View>
      <ProductList filteredProducts={filteredProducts} />
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 15,
    marginVertical: 20,
  },

  input: {
    height: 40,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#ccc",
    marginVertical: 12,
    paddingHorizontal: 10,
  },
});
