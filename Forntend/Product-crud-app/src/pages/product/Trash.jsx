import { useEffect, useState } from "react";
import { restoreProduct } from "../../api/services/product/restoreProduct";
import { getTrashProduct } from "../../api/services/product/getTrashProduct";
import { deleteProduct } from "../../api/services/product/deleteProduct";
import { useNavigate } from "react-router-dom";
function Trash() {
  const [products, setProducts] = useState([]);
const navigate = useNavigate();
  const fetchTrash = async () => {
    const res = await getTrashProduct();
    setProducts(res.data.data);
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  const handleRestore = async (id) => {
    await restoreProduct(id);

    alert("Product Restored");

    fetchTrash();
  };
  const handlePermanentDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product Permanently?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteProduct(id);

      alert("Product Deleted Successfully");

      fetchTrash();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
 return (
  <div className="container mt-4">

    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Trash Products</h2>

      <button
        className="btn btn-primary"
        onClick={() => navigate("/")}
      >
        Move To Products
      </button>
    </div>

    {products.length === 0 ? (
      <div className="text-center mt-5">
        <h3>No Data Found</h3>
      </div>
    ) : (
      <div className="row">
        {products.map((item) => (
          <div
            className="col-md-4 mb-4"
            key={item._id}
          >
            <div className="card">

              <img
                src={`http://localhost:3005/${item.image}`}
                className="card-img-top"
                style={{
                  height: "220px",
                  objectFit: "cover",
                }}
                alt=""
              />

              <div className="card-body">
                <h4>{item.productName}</h4>

                <p>{item.desc}</p>

                <div className="d-flex gap-2">

                  <button
                    className="btn btn-success flex-fill"
                    onClick={() =>
                      handleRestore(item._id)
                    }
                  >
                    Restore
                  </button>

                  <button
                    className="btn btn-danger flex-fill"
                    onClick={() =>
                      handlePermanentDelete(item._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    )}

  </div>
);
}

export default Trash;