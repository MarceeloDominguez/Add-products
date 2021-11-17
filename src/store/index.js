import { combineReducers, createStore } from "redux";
import productosReducer from "./productosReducer";

//const store = createStore(productosReducer);
const combinedReducers = combineReducers({
  productosReducer,
});
const store = createStore(combinedReducers);
export default store;
