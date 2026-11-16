
import React, { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import "./Products.css";

const Products = () => {
  const { products, loading } = useContext(ProductContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  const searchTerm = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "all";

  const categories = [
    { label: "All Products", value: "all" },
    { label: "Electronics", value: "electronics" },
    { label: "Jewelry", value: "jewelery" },
    { label: "Men's Clothing", value: "men's clothing" },
    { label: "Women's Clothing", value: "women's clothing" },
  ];

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value;
    const newParams = {};

    if (value.trim()) {
      newParams.search = value.trim();
    }

    if (selectedCategory !== "all") {
      newParams.category = selectedCategory;
    }

    setSearchParams(newParams);
    setCurrentPage(1);
  };

  // Handle category filter
  const handleCategoryChange = (category) => {
    const newParams = {};

    if (searchTerm) {
      newParams.search = searchTerm;
    }

    if (category !== "all") {
      newParams.category = category;
    }

    setSearchParams(newParams);
    setCurrentPage(1);
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts];

  if (sortOption === "lowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "highToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "nameAsc") {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "nameDesc") {
    sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
  }

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Reset page if product count changes
  useEffect(() => {
    setCurrentPage(1);
  }, [products.length]);

  return (
    <div className="products-page">

      <div className="products-heading">
        <p>SHOP OUR COLLECTION</p>
        <h1>
          All <span>Products</span>
        </h1>
        <h4>Find your favourite products at ShopEase.</h4>
      </div>

      {/* Search */}
      <div className="product-search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {searchTerm && (
        <p className="search-result-text">
          Search results for: <strong>{searchTerm}</strong>
        </p>
      )}

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category.value}
            className={
              selectedCategory === category.value
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => handleCategoryChange(category.value)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Sorting */}
      <div className="sort-container">
        <label htmlFor="sortProducts">Sort By:</label>

        <select
          id="sortProducts"
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="default">Featured</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <p className="products-message">Loading products...</p>
      )}

      {/* Products */}
      {!loading && (
        <>
          <div className="products-count">
            <p>
              Showing {currentProducts.length} of {sortedProducts.length} products
            </p>
          </div>

          {currentProducts.length > 0 ? (
            <div className="products-container">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <p className="no-products">No products found.</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={
                    currentPage === index + 1 ? "active" : ""
                  }
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
