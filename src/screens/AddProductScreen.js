import React, { useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { Button } from "react-native-elements";
import { Paragraph } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import uuid from "random-uuid-v4";
import { InputField } from "../components/InputField";

export default function AddProductScreen({ route }) {
  const data = useSelector((state) => state.productosReducer.data);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const id = route.params;
  const [formData, setFormData] = useState({
    nombre: "",
    medida: "",
    precio: "",
    codigo: "",
    idCategoria: id,
    id: uuid(),
  });

  const onchange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const productCode = data.find((item) => item.codigo === formData.codigo);

  const isValidForm =
    formData.nombre !== "" && formData.precio !== "" && formData.codigo !== "";

  const onpress = () => {
    if (isValidForm && !productCode) {
      dispatch({
        type: "addProduct",
        payload: formData,
      });
      navigation.goBack();
    }
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "#F4F6F6" }}>
      <View style={styles.formContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Paragraph>Nombre</Paragraph>
        <InputField
          placeholder="Nombre del producto"
          onChange={(e) => onchange(e, "nombre")}
        />
        <Paragraph>Medida</Paragraph>
        <InputField
          placeholder="1 Litro/Kg"
          onChange={(e) => onchange(e, "medida")}
        />
        <Paragraph>Precio</Paragraph>
        <InputField placeholder="500" onChange={(e) => onchange(e, "precio")} />
        <Paragraph>Codigo</Paragraph>
        <InputField
          placeholder="#2309587456"
          onChange={(e) => onchange(e, "codigo")}
          value={formData.codigo}
        />
        <Button
          title="Escanear"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.buttonStyle}
          onPress={() =>
            navigation.navigate("EscanearProductScreen", {
              onCodeDetec: (code) => {
                setFormData({ ...formData, codigo: code });
              },
              data,
            })
          }
        />
        <Button
          title={productCode ? "El código ya existe" : "Agregar"}
          containerStyle={styles.btnContainer}
          buttonStyle={{ borderRadius: 10 }}
          onPress={onpress}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 20,
  },
  btnContainer: {
    marginTop: 20,
    width: "100%",
  },
  codigo: {
    marginTop: 35,
    textAlign: "center",
  },
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: "#7A0D57",
    borderRadius: 10,
  },
});
