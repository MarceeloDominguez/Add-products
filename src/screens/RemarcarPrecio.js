import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { InputField } from "../components/InputField";
import { useDispatch, useSelector } from "react-redux";

export default function RemarcarPrecio() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productosReducer.data);
  const [codigo, setCodigo] = useState("");
  const [formData, setFormData] = useState({});

  const productCode = data.find((item) => item.codigo === codigo);

  const onScaner = (e) => {
    if (codigo === "") {
      setCodigo(e.data);
    }
  };

  const actualizar = () => {
    dispatch({
      type: "remarcarProductos",
      payload: { ...productCode, ...formData },
    });
    setCodigo("");
  };

  const onchange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <>
      <BarCodeScanner
        onBarCodeScanned={codigo === "" ? onScaner : undefined}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.viewContainer}>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            {!productCode ? (
              <Text style={styles.codigo}>Escaneando...</Text>
            ) : (
              <>
                <Text style={styles.codigo}>{codigo}</Text>
                <Text style={{ marginRight: 20, fontWeight: "bold" }}>
                  Producto: {productCode?.nombre}
                </Text>
                <Text style={{ fontWeight: "bold" }}>Precio</Text>
                <InputField
                  onChange={(e) => onchange(e, "precio")}
                  value={productCode?.precio}
                />
              </>
            )}
          </View>
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
              onPress={actualizar}
            >
              <Text style={styles.titleButton}>Actualizar</Text>
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
