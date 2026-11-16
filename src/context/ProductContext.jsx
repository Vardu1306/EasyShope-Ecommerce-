
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products from localStorage or FakeStore API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const savedProducts = localStorage.getItem("shopeaseProducts");

        if (savedProducts) {
          const parsedProducts = JSON.parse(savedProducts);

          // Give default stock to products without stock
          const productsWithStock = parsedProducts.map((product) => ({
            ...product,
            stock: product.stock ?? 10,
          }));

          setProducts(productsWithStock);

          localStorage.setItem(
            "shopeaseProducts",
            JSON.stringify(productsWithStock)
          );

          return;
        }

        const response = await axios.get(
          "https://fakestoreapi.com/products"
        );

        // Assign default stock to API products
        const productsWithStock = response.data.map((product) => ({
          ...product,
          stock: 10,
        }));

        setProducts(productsWithStock);

        localStorage.setItem(
          "shopeaseProducts",
          JSON.stringify(productsWithStock)
        );
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Add product
  const addProduct = (product) => {
    setProducts((prevProducts) => {
      const updatedProducts = [
        ...prevProducts,
        {
          ...product,
          id: Date.now(),
          stock: Number(product.stock ?? 10),
        },
      ];

      localStorage.setItem(
        "shopeaseProducts",
        JSON.stringify(updatedProducts)
      );

      return updatedProducts;
    });
  };

  // Update product
  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        String(product.id) === String(updatedProduct.id)
          ? {
              ...updatedProduct,
              stock: Number(updatedProduct.stock ?? 0),
            }
          : product
      );

      localStorage.setItem(
        "shopeaseProducts",
        JSON.stringify(updatedProducts)
      );

      return updatedProducts;
    });
  };

  // Delete product
  const deleteProduct = (id) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (product) => String(product.id) !== String(id)
      );

      localStorage.setItem(
        "shopeaseProducts",
        JSON.stringify(updatedProducts)
      );

      return updatedProducts;
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
