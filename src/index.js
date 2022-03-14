import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Reducer from "./Components/Redux/reducer";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, Reducer);
const store = createStore(persistedReducer, composeWithDevTools());
const finalStore = persistStore(store);
// const store = createStore(Reducer, composeWithDevTools());
// const store = createStore(Reducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={finalStore}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
