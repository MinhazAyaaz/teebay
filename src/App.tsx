import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import MyProducts from "./pages/MyProducts";
import AllProducts from "./pages/AllProducts";
import AddProduct from "./pages/AddProduct";
import SingleProduct from "./pages/SingleProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-products" element={<MyProducts />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/my-products/:id" element={<SingleProduct />} />
          <Route path="/all-products/:id" element={<SingleProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
