import stateManagement from "./store";

const Reducer = (state = stateManagement, action) => {
  const { type, value } = action;
  switch (type) {
    case "setData":
      return { ...state, cardsData: value };
    case "clear":
    case "clearData":
      return (state = stateManagement);
    case "value":
      return { ...state, number: value };
    default:
      return state;
  }
};
export default Reducer;
