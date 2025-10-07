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
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public-only routes: redirect to home if already authenticated */}
          <Route element={<PublicRoute whenAuthenticatedRedirectTo="/" />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Protected routes: require authentication */}
          <Route element={<ProtectedRoute redirectTo="/login" />}>
            <Route path="/" element={<Home />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/my-products/:id" element={<SingleProduct />} />
            <Route path="/all-products/:id" element={<SingleProduct />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
