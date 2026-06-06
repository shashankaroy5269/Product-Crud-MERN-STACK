import React from "react";

function Sidebar({
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  selectedBrand,
  setSelectedBrand,
  handleFilter,
}) {

  const handleSize = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedSize([...selectedSize, value]);
    } else {
      setSelectedSize(
        selectedSize.filter((item) => item !== value)
      );
    }
  };

  const handleColor = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedColor([...selectedColor, value]);
    } else {
      setSelectedColor(
        selectedColor.filter((item) => item !== value)
      );
    }
  };

  const handleBrand = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedBrand([...selectedBrand, value]);
    } else {
      setSelectedBrand(
        selectedBrand.filter((item) => item !== value)
      );
    }
  };

  return (
    <div
      className="p-4 bg-white shadow-sm border-end"
      style={{ minHeight: "100vh" }}
    >
      <h3
        className="fw-bold text-center mb-4"
        style={{ color: "#0d6efd" }}
      >
        Product Filter
      </h3>

      <hr />


      <div className="mb-4">
        <h5 className="fw-bold mb-3">
          Size
        </h5>

        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            value="S"
            onChange={handleSize}
          />

          <label className="form-check-label">
            S
          </label>

        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="M"
            onChange={handleSize}
          />
          <label className="form-check-label">
            M
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="L"
            onChange={handleSize}
          />
          <label className="form-check-label">
            L
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="XL"
            onChange={handleSize}
          />
          <label className="form-check-label">
            XL
          </label>
        </div>
      </div>

      <hr />


      <div className="mb-4">
        <h5 className="fw-bold mb-3">
          Color
        </h5>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="Black"
            onChange={handleColor}
          />
          <label className="form-check-label">
            Black
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="Blue"
            onChange={handleColor}
          />
          <label className="form-check-label">
            Blue
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="Red"
            onChange={handleColor}
          />
          <label className="form-check-label">
            Red
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="White"
            onChange={handleColor}
          />
          <label className="form-check-label">
            White
          </label>
        </div>
      </div>

      <hr />

      <div className="mb-4">
        <h5 className="fw-bold mb-3">
          Brand
        </h5>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="polo"
            onChange={handleBrand}
          />
          <label className="form-check-label">
            Polo
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="nike"
            onChange={handleBrand}
          />
          <label className="form-check-label">
            Nike
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value="HP"
            onChange={handleBrand}
          />
          <label className="form-check-label">
            HP
          </label>
        </div>
      </div>

      <button
        className="btn btn-primary w-100 fw-bold"
        onClick={handleFilter}
      >
        Apply Filter
      </button>
    </div>
  );
}

export default Sidebar;