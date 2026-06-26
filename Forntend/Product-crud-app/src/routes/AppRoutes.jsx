import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Product from "../pages/product/Product";
import AddProduct from "../pages/product/AddProduct";
import EditProduct from "../pages/product/EditProduct";
import Trash from "../pages/product/Trash";
import Login from "../pages/product/Login";
import Register from "../pages/product/Register";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    const choice = window.confirm(
      "To use this feature Login first \n\nClick on OK for Login \n And Cancel for Register"
    );

    return (
      <Navigate
        to={choice ? "/login" : "/register"}
        replace
      />
    );
  }

  return children;
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-product/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trash"
          element={
            <ProtectedRoute>
              <Trash />
            </ProtectedRoute>
          }
        />

        {/* Invalid Route */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;