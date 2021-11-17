import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { Title, Paragraph } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { InputField } from "../components/InputField";

export default function EditProductsScreen({ route }) {
  const { goBack, setOptions, navigate } = useNavigation();
  const item = route.params;
  const data = useSelector((state) => state.productosReducer.data);

  const { nombre, medida, precio, codigo, id } = item;
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    nombre: nombre,
    medida: medida,
    precio: precio,
    codigo: codigo,
  });

  const onDelete = (id) => {
    Alert.alert("Eliminar Producto", "¿Estás seguro que lo quiere eliminar?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Borrar",
        onPress: () => {
          dispatch({
            type: "deleteProduct",
            payload: id,
          });
          goBack();
        },
      },
    ]);
  };

  useEffect(() => {
    setOptions({
      headerTitle: () => <Title>{codigo}</Title>,
      headerTitleAlign: "center",
      headerRight: () => (
        <TouchableOpacity
          style={styles.buttonAdd}
          activeOpacity={0.8}
          onPress={() => onDelete(id)}
        >
          <Icon type="material-community" name="delete" color="red" />
        </TouchableOpacity>
      ),
    });
  }, [setOptions]);

  const onchange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const isValidForm =
    formData.nombre !== "" && formData.precio !== "" && formData.codigo !== "";

  const onSave = () => {
    if (!isValidForm) {
      return;
    }

    dispatch({
      type: "editProduct",
      payload: {
        // ...data,
        // ...formData,
        id: item.id,
        idCategoria: item.idCategoria,
        nombre: formData.nombre,
        precio: formData.precio,
        codigo: formData.codigo,
        medida: formData.medida,
      },
    });
    goBack();
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "#F4F6F6" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.formContainer}>
        <Paragraph>Nombre</Paragraph>
        <InputField onChange={(e) => onchange(e, "nombre")} value={nombre} />
        <Paragraph>Medida</Paragraph>
        <InputField onChange={(e) => onchange(e, "medida")} value={medida} />
        <Paragraph>Precio</Paragraph>
        <InputField onChange={(e) => onchange(e, "precio")} value={precio} />

        <Button
          title="Actualizar código"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.buttonStyle}
          onPress={() =>
            navigate("EscanearProductScreen", {
              onCodeDetec: (code) => {
                setFormData({ ...formData, codigo: code });
              },
              data,
            })
          }
        />
        <Button
          title="Guardar"
          containerStyle={styles.btnContainer}
          buttonStyle={{ borderRadius: 10 }}
          onPress={onSave}
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
    marginTop: 30,
  },
  btnContainer: {
    marginTop: 20,
    width: "100%",
  },
  codigo: {
    marginTop: 15,
    textAlign: "center",
  },
  buttonAdd: {
    right: 16,
    padding: 1,
    backgroundColor: "#fff",
  },
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: "#7A0D57",
    borderRadius: 10,
  },
});
