import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct } from "../../api/services/product/getSingleProduct";
import { updateProduct } from "../../api/services/product/updateProduct";

function EditProduct() {
  const { id } = useParams();
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

  const loadProduct = async () => {
    try {
      const res = await getSingleProduct(id);

      setFormData({
        productName: res?.data?.data?.productName || "",
        productPrice: res?.data?.data?.productPrice || "",
        desc: res?.data?.data?.desc || "",
        brand: res?.data?.data?.brand || "",
        size: res?.data?.data?.size || "",
        color: res?.data?.data?.color || "",
        image: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

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

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const res = await updateProduct(id, data);

      if (res?.data?.status) {
        alert("Product Updated Successfully");
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
        <h2 className="text-center mb-4">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="form-control mb-3"
            placeholder="Product Name"
          />

          <input
            type="number"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleChange}
            className="form-control mb-3"
            placeholder="Product Price"
          />

          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="form-control mb-3"
            rows="3"
            placeholder="Description"
          />

          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="form-control mb-3"
            placeholder="Brand"
          />

          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="form-control mb-3"
          >
            <option value="">Select Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>

          <select
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="form-control mb-3"
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
            className="btn btn-success w-100"
          >
            Update Product
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditProduct;