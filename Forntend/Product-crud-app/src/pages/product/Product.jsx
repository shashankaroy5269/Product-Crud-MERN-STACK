import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getProducts } from "../../api/services/product/getProduct";
import { deleteProduct } from "../../api/services/product/deleteProduct";
import { softDeleteProduct } from "../../api/services/product/softDelete";
function Product() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      const data = res?.data?.data || [];

      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const handleSearch = () => {

    if (search.trim() === "") {
      setFilteredProducts(products);
      return;
    }

    const result = products.filter((item) =>
      item.productName
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredProducts(result);

    setSearch("");
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteProduct(id);

      alert("Product Deleted Successfully");

      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
 const handleFilter = () => {
  console.log(selectedSize);
console.log(selectedColor);
console.log(selectedBrand);
  let result = [...products];

  if (selectedSize.length > 0) {
    result = result.filter((item) =>
      item.size?.some((s) =>
        selectedSize.includes(s)
      )
    );
  }

  if (selectedColor.length > 0) {
    result = result.filter((item) =>
      item.color?.some((c) =>
        selectedColor.includes(c)
      )
    );
  }

  if (selectedBrand.length > 0) {
    result = result.filter((item) =>
      selectedBrand.includes(item.brand)
    );
  }

  setFilteredProducts(result);
};

  const handleSoftDelete = async (id) => {
    console.log("click", id);

    const confirmDelete = window.confirm(
      "Move product to trash?"
    );

    if (!confirmDelete) return;

    try {
      await softDeleteProduct(id);

      alert("Product moved to trash");

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar */}
        <div
          className="col-md-2 bg-light border-end"
          style={{ minHeight: "100vh" }}
        >
          <Sidebar
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            handleFilter={handleFilter}
          />
        </div>
        <div className="col-md-10">
          <div className="d-flex justify-content-between align-items-center border-bottom p-3 bg-white shadow-sm">
            <h5 className="fw-bold mb-0">Home</h5>

            <div className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Search Product..."
                value={search}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearch(value);

                  if (value.trim() === "") {
                    setFilteredProducts(products);
                  } else {
                    const result = products.filter((item) =>
                      item.productName
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );

                    setFilteredProducts(result);
                  }
                }}
              />
              <button className="btn btn-success ms-2">
                Search
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">

              <h3 className="fw-bold">All Products</h3>

              <div className="d-flex gap-2">
                <Link
                  to="/add-product"
                  className="btn btn-primary"
                >
                  Add Product
                </Link>

                <Link
                  to="/trash"
                  className="btn btn-dark"
                >
                  Trash
                </Link>
              </div>

            </div>
            <div className="row g-4">

              {filteredProducts?.length > 0 ? (

                filteredProducts.map((item) => (

                  <div
                    className="col-lg-4 col-md-6 col-sm-12"
                    key={item._id}
                  >
                    <div className="card product-card h-100">

                      <img
                        src={
                          item.image
                            ? `http://localhost:3005/${item.image}`
                            : "https://via.placeholder.com/400x250"
                        }
                        alt={item.productName}
                        className="product-img"
                      />

                      <div className="card-body d-flex flex-column">

                        <h5 className="text-center fw-bold">
                          {item.productName}
                        </h5>

                        <p className="text-center text-muted small">
                          {item.desc}
                        </p>

                        <hr />

                        <p>
                          <strong>Price :</strong> ₹
                          {item.productPrice}
                        </p>

                        <p>
                          <strong>Size :</strong>{" "}
                          {Array.isArray(item.size)
                            ? item.size.join(", ")
                            : item.size || "-"}
                        </p>

                        <p>
                          <strong>Color :</strong>{" "}
                          {Array.isArray(item.color)
                            ? item.color.join(", ")
                            : item.color || "-"}
                        </p>

                        <p>
                          <strong>Brand :</strong>{" "}
                          {item.brand || "-"}
                        </p>

                        <div className="mt-auto">

                          <div className="d-flex gap-1">

                            <Link
                              to={`/edit-product/${item._id}`}
                              className="btn btn-success btn-sm flex-fill"
                            >
                              Edit
                            </Link>

                            <button
                              className="btn btn-danger btn-sm flex-fill"
                              onClick={() =>
                                handleDelete(item._id)
                              }
                            >
                              Delete
                            </button>

                            <button
                              className="btn btn-warning btn-sm flex-fill"
                              onClick={() =>
                                handleSoftDelete(item._id)
                              }
                            >
                              Soft Delete
                            </button>

                          </div>

                        </div>

                      </div>
                    </div>
                  </div>

                ))

              ) : (

                <div className="text-center py-5">
                  <h4>No Product Found</h4>
                </div>

              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Product;