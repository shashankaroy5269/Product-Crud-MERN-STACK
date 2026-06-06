import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "../pages/product/Product";
import AddProduct from "../pages/product/AddProduct";
import EditProduct from "../pages/product/EditProduct";
import Trash from "../pages/product/Trash";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Product />} />
         <Route path="/add-product" element={<AddProduct />} />
         <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/trash" element={<Trash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;