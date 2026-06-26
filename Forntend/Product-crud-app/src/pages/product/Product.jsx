import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
  const [visibleCount, setVisibleCount] = useState(6);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const checkLogin = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        title: " Login Required",
        html: `
        <h5 style="color:#dc3545">
          Please Login or Register First
        </h5>
        <p>
          You must login to access this feature.
        </p>
      `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Register",
        confirmButtonColor: "#0d6efd",
        cancelButtonColor: "#198754",
        background: "#f8f9fa",
        allowOutsideClick:true,
       
      }).then((result) => {
  if (result.isConfirmed) {
    navigate("/login");
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    navigate("/register");
  }
});

      return false;
    }

    return true;
  };


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
  const result = await Swal.fire({
    title: " Delete Product?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    await deleteProduct(id);

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Product deleted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

    fetchProducts();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Something went wrong.",
    });
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
  const result = await Swal.fire({
    title: " Move To Trash?",
    text: "Product will be moved to trash.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#f39c12",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Move",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    await softDeleteProduct(id);

    Swal.fire({
      icon: "success",
      title: "Moved!",
      text: "Product moved to trash successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

    fetchProducts();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Something went wrong.",
    });
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

              <div className="d-flex gap-2 align-items-center">

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (checkLogin()) {
                      navigate("/add-product");
                    }
                  }}
                >
                  Add Product
                </button>

                <button
                  className="btn btn-dark"
                  onClick={() => {
                    if (checkLogin()) {
                      navigate("/trash");
                    }
                  }}
                >
                  Trash
                </button>

                <div className="dropdown">
                  <button
                    className="btn btn-success dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Account
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end">

                    {!token ? (
                      <>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/login"
                          >
                            Login
                          </Link>
                        </li>

                        <li>
                          <Link
                            className="dropdown-item"
                            to="/register"
                          >
                            Register
                          </Link>
                        </li>
                      </>
                    ) : (
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/";
                          }}
                        >
                          Logout
                        </button>
                      </li>
                    )}

                  </ul>
                </div>

              </div>
            </div>
            <div className="row g-4">

              {filteredProducts?.length > 0 ? (

                filteredProducts.slice(0, visibleCount).map((item) => (

                  <div
                    className="col-lg-4 col-md-6 col-sm-12"
                    key={item._id}
                  >
                    <div className="card product-card h-100">

                      <img
                        src={
                          item.image
                            ? item.image
                            : "https://via.placeholder.com/400x200"
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

                            <button
                              className="btn btn-success btn-sm flex-fill"
                              onClick={() => {
                                if (checkLogin()) {
                                  navigate(`/edit-product/${item._id}`);
                                }
                              }}
                            >
                              Edit
                            </button>

                            <button
                              className="btn btn-danger btn-sm flex-fill"
                              onClick={() => {
                                handleDelete(item._id)
                              }}
                            >
                              Delete
                            </button>

                            <button
                              className="btn btn-warning btn-sm flex-fill"
                              onClick={() => {
                                handleSoftDelete(item._id);

                              }}
                            >
                              Move to Trash
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
            {visibleCount < filteredProducts.length && (
              <div className="text-center mt-4">
                <button
                  className="btn btn-primary px-4"
                  onClick={() => setVisibleCount(visibleCount + 6)}
                >
                  Load More
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Product;