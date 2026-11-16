
import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import "./AdminProducts.css";

const AdminProducts = () => {
  const {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useContext(ProductContext);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    title: "",
    price: "",
    category: "",
    image: "",
    description: "",
    stock: "",
  };

  const [formData, setFormData] = useState(initialForm);

  // Handle Form Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add or Update Product
  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    if (editingId !== null) {
      updateProduct({
        ...productData,
        id: editingId,
      });

      alert("Product updated successfully!");
    } else {
      addProduct(productData);
      alert("Product added successfully!");
    }

    setFormData(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  // Edit Product
  const handleEdit = (product) => {
    setFormData({
      title: product.title,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description || "",
      stock: product.stock ?? 0,
    });

    setEditingId(product.id);
    setShowForm(true);
  };

  // Delete Product
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      deleteProduct(id);
      alert("Product deleted successfully!");
    }
  };

  // Cancel Form
  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(initialForm);
  };

  // Search Products
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-products">

      <div className="admin-products-header">
        <div>
          <h1>Manage Products</h1>
          <p>Add, edit, delete and manage your store products.</p>
        </div>

        <button
          className="add-product-btn"
          onClick={() => {
            handleCancel();
            setShowForm(true);
          }}
        >
          + Add Product
        </button>
      </div>

      {/* Product Form */}
      {showForm && (
        <form className="add-product-form" onSubmit={handleSubmit}>
          <h2>
            {editingId !== null ? "Edit Product" : "Add New Product"}
          </h2>

          <input
            type="text"
            name="title"
            placeholder="Product Name"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Product Price"
            value={formData.price}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>

          {/* Stock Quantity */}
          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            step="1"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Product Image URL"
            value={formData.image}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <div className="product-form-buttons">
            <button type="submit">
              {editingId !== null ? "Update Product" : "Save Product"}
            </button>

            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Product Count */}
      <div className="admin-products-stats">
        <div className="product-stat-card">
          <h3>Total Products</h3>
          <h2>{products.length}</h2>
        </div>
      </div>

      {/* Product Table */}
      <div className="admin-products-table">

        <div className="product-table-header">
          <h2>All Products</h2>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="admin-product-message">Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="admin-product-message">No products found.</p>
        ) : (
          <div className="product-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="admin-product-image"
                      />
                    </td>

                    <td>{product.title}</td>
                    <td>{product.category}</td>
                    <td>₹{product.price}</td>
                    <td>{product.stock ?? 0}</td>

                    <td>
                      <button
                        className="edit-product-btn"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-product-btn"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
