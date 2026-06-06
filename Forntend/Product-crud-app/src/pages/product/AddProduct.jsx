import { useState } from "react";
import { createProduct } from "../../api/services/product/createProduct";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    desc: "",
    brand: "",
    size: "",
    color: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("productName", formData.productName);
    data.append("productPrice", formData.productPrice);
    data.append("desc", formData.desc);
    data.append("brand", formData.brand);
    data.append("size", formData.size);
    data.append("color", formData.color);
    data.append("image", formData.image);

    try {
      const res = await createProduct(data);

      if (res?.data?.status) {
        alert("Product Created Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">
          Add Product
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="productName"
            className="form-control mb-3"
            placeholder="Product Name"
            onChange={handleChange}
          />

          <input
            type="number"
            name="productPrice"
            className="form-control mb-3"
            placeholder="Product Price"
            onChange={handleChange}
          />

          <textarea
            name="desc"
            className="form-control mb-3"
            placeholder="Description"
            rows="3"
            onChange={handleChange}
          />

          <input
            type="text"
            name="brand"
            className="form-control mb-3"
            placeholder="Brand"
            onChange={handleChange}
          />

          <select
            name="size"
            className="form-control mb-3"
            onChange={handleChange}
          >
            <option value="">Select Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>

          <select
            name="color"
            className="form-control mb-3"
            onChange={handleChange}
          >
            <option value="">Select Color</option>
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
            <option value="Red">Red</option>
            <option value="White">White</option>
          </select>

          <input
            type="file"
            name="image"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;