import AsyncStorage from "@react-native-async-storage/async-storage";

const saveLocalData = async (data) => {
  await AsyncStorage.setItem("productosStore", JSON.stringify(data));
};

const getLocalData = async () => {
  const data = await AsyncStorage.getItem("productosStore");
  if (data) {
    return JSON.parse(data);
  }

  return { data: [] };
};

export { saveLocalData, getLocalData };
