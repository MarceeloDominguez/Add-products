import React from "react";
import { TextInput, StyleSheet } from "react-native";

export const InputField = ({ placeholder, onChange, value }) => {
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={value}
        //keyboardType='phone-pad'
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#ccc",
    marginVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});
