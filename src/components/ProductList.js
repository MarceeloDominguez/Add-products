import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

export default function ProductList({ filteredProducts }) {
  const navigation = useNavigation();

  return (
    <FlatList
      data={filteredProducts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={(item) => (
        <RenderListItem data={item} navigation={navigation} />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

function RenderListItem({ data, navigation }) {
  const { nombre, codigo, precio, medida, img, id } = data.item;

  return (
    <Pressable
      style={{
        flexDirection: "row",
        paddingHorizontal: 16,
        marginVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: "#ccc",
        paddingBottom: 12,
      }}
      onPress={() => navigation.navigate("EditProductsScreen", data.item)}
    >
      {img ? (
        <Avatar source={{ uri: img }} style={styles.image} rounded />
      ) : (
        <Avatar
          source={require("../img/avatar-default.jpg")}
          style={styles.image}
          rounded
        />
      )}

      <ListItem.Content>
        <ListItem.Title>{nombre}</ListItem.Title>
        <ListItem.Subtitle>#{codigo}</ListItem.Subtitle>
        <View style={{ flexDirection: "row" }}>
          <ListItem.Title>$ {precio}</ListItem.Title>
          <ListItem.Subtitle style={{ left: 5, textAlignVertical: "center" }}>
            {medida}
          </ListItem.Subtitle>
        </View>
      </ListItem.Content>
      <ListItem.Chevron />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
    paddingVertical: 15,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 10,
    alignSelf: "center",
    borderRadius: 20,
    marginRight: 12,
  },
  price: {
    textAlignVertical: "center",
    marginRight: 5,
  },
  nameProduct: {
    fontSize: 14,
    fontWeight: "bold",
  },
  containerIcon: {
    padding: 5,
    borderRadius: 50,
  },
});
