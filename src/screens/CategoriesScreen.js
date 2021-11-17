import React from "react";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  StatusBar,
  TouchableNativeFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, Title } from "react-native-paper";
import categorias from "../util/categorias";

const { width } = Dimensions.get("window");
const cardWidth = width / 3 - 20;

export default function CategoriesScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#F4F6F6" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F6" />
      <Title style={{ textAlign: "center", marginVertical: 30 }}>
        Categorias
      </Title>
      <FlatList
        data={categorias}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => (
          <RenderItem data={item} navigation={navigation} />
        )}
        numColumns={3}
      />
    </View>
  );
}

function RenderItem({ data, navigation }) {
  const { categoryName } = data.item;

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.imageContainer}>
        <TouchableNativeFeedback
          onPress={() => navigation.navigate("ProductListScreen", data.item)}
          background={TouchableNativeFeedback.Ripple("#ccc", true, 130)}
        >
          <View>
            <Image
              source={require("../img/avatar-default.jpg")}
              style={styles.image}
            />
            <Title style={{ fontSize: 12, textAlign: "center" }}>
              {categoryName}
            </Title>
          </View>
        </TouchableNativeFeedback>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 30,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
  },
  imageContainer: {
    borderRadius: 30,
    shadowColor: "#000",
    backgroundColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
  },
  containerTextInput: {
    marginHorizontal: 10,
    shadowColor: "#000",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
    marginBottom: 25,
  },
  textInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    height: 45,
    borderRadius: 10,
  },
});

{
  /* <Button
  title="LimpiarStorage"
  onPress={() => {
    AsyncStorage.removeItem("productosStore");
  }}
/>; */
}
