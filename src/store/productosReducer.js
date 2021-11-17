import { saveLocalData } from "../util/api";

const initialState = {
  data: [],
};

const productosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "loadData": {
      return action.payload;
    }

    case "addProduct": {
      const newData = [...state.data];
      newData.push(action.payload);

      const newState = {
        data: newData,
      };

      saveLocalData(newState);
      return newState;
    }

    case "deleteProduct": {
      const newData = [...state.data];

      const newState = {
        data: newData.filter((item) => action.payload !== item.id),
      };

      saveLocalData(newState);
      return newState;
    }

    case "editProduct": {
      //console.log(action);
      const newData = [...state.data];

      const newState = {
        data: newData.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }
          return item;
        }),
      };
      saveLocalData(newState);
      return newState;
    }

    case "remarcarProductos": {
      const newData = [...state.data];

      const newState = {
        data: newData.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }

          return item;
        }),
      };
      saveLocalData(newState);
      return newState;
    }

    default:
      return state;
  }
};

export default productosReducer;
