
import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import "./AdminInventory.css";

const AdminInventory = () => {
  const { products, updateProduct } = useContext(ProductContext);

  const [search, setSearch] = useState("");

  const totalStock = products.reduce(
    (total, product) => total + Number(product.stock || 0),
    0
  );

  const lowStock = products.filter(
    (product) =>
      Number(product.stock || 0) > 0 &&
      Number(product.stock || 0) <= 5
  );

  const outOfStock = products.filter(
    (product) => Number(product.stock || 0) === 0
  );

  const handleStockChange = (id, value) => {
    if (value === "" || Number(value) < 0) return;

    const selectedProduct = products.find(
      (product) => product.id === id
    );

    if (!selectedProduct) return;

    updateProduct({
      ...selectedProduct,
      stock: Number(value),
    });
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-inventory">
      <div className="inventory-header">
        <div>
          <h1>Inventory Management</h1>
          <p>Monitor and manage your product stock</p>
        </div>
      </div>

      {/* Inventory Statistics */}
      <div className="inventory-stats">
        <div className="inventory-stat-card">
          <h3>Total Products</h3>
          <h2>{products.length}</h2>
        </div>

        <div className="inventory-stat-card">
          <h3>Total Stock</h3>
          <h2>{totalStock}</h2>
        </div>

        <div className="inventory-stat-card low-stock-card">
          <h3>Low Stock</h3>
          <h2>{lowStock.length}</h2>
        </div>

        <div className="inventory-stat-card out-stock-card">
          <h3>Out of Stock</h3>
          <h2>{outOfStock.length}</h2>
        </div>
      </div>

      {/* Product Search */}
      <div className="inventory-table-section">
        <div className="inventory-table-header">
          <h2>Product Stock Details</h2>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="inventory-table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock Quantity</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const stock = Number(product.stock || 0);

                  return (
                    <tr key={product.id}>
                      <td>
                        <div className="inventory-product">
                          <img
                            src={product.image}
                            alt={product.title}
                          />
                          <span>{product.title}</span>
                        </div>
                      </td>

                      <td>{product.category}</td>

                      <td>₹{Number(product.price).toFixed(2)}</td>

                      <td>
                        <input
                          className="stock-input"
                          type="number"
                          min="0"
                          value={stock}
                          onChange={(e) =>
                            handleStockChange(
                              product.id,
                              e.target.value
                            )
                          }
                        />
                      </td>

                      <td>
                        {stock === 0 ? (
                          <span className="stock-status out">
                            Out of Stock
                          </span>
                        ) : stock <= 5 ? (
                          <span className="stock-status low">
                            Low Stock
                          </span>
                        ) : (
                          <span className="stock-status available">
                            Available
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="inventory-empty">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminInventory;
