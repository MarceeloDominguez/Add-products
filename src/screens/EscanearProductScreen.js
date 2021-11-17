import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/core";

export default function EscanearProductScreen({ route }) {
  const { onCodeDetec } = route.params;
  const { data, items } = route.params;

  const { goBack } = useNavigation();
  const [codigo, setCodigo] = useState("");

  const productCode = data?.find((item) => item.codigo === codigo);

  const onScaner = (e) => {
    if (codigo === "") {
      setCodigo(e.data);
    }
  };

  return (
    <>
      <BarCodeScanner
        onBarCodeScanned={codigo === "" ? onScaner : undefined}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.viewContainer}>
        <View style={styles.container}>
          {codigo ? (
            <Text style={styles.codigo}>Codigo leído</Text>
          ) : (
            <Text style={styles.codigo}>Leer codigo</Text>
          )}

          {productCode ? (
            <Text style={styles.codigo}>El codigo ya existe</Text>
          ) : (
            <Text style={styles.codigo}>{codigo}</Text>
          )}
          <View style={styles.containerButton}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ ...styles.button, backgroundColor: "#7A0D57" }}
              onPress={() => setCodigo("")}
            >
              <Text style={styles.titleButton}>Reintentar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ ...styles.button, backgroundColor: "#086D0E" }}
              onPress={() => {
                productCode ? onCodeDetec() : (onCodeDetec(codigo), goBack());
              }}
            >
              <Text style={styles.titleButton}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  container: {
    height: 250,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
  },
  codigo: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 22,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  button: {
    width: 140,
    padding: 10,
    borderRadius: 5,
  },
  titleButton: {
    textAlign: "center",
    color: "#fff",
  },
});
