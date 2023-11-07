import { legacy_createStore as createStore } from "redux";

const initialState = {
  theme: "theme-color",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
