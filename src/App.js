import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cart from "./Components/cart/cart";
import Home from "./Components/Home/home";
import Order from "./Components/Order/index.js";
import Succes from "./Components/Order/Succes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to="/home" />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
        <Route exact path="/PlaceOrder" element={<Order />}></Route>
        <Route exact path="/success" element={<Succes />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
