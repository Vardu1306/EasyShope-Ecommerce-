
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Category.css";

const Category = () => {

  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Electronics",
      description: "Discover the latest gadgets",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600",
      category: "electronics"
    },
    {
      id: 2,
      name: "Fashion",
      description: "Upgrade your everyday style",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600",
      category: "men's clothing"
    },
    {
      id: 3,
      name: "Jewelry",
      description: "Add elegance to your look",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600",
      category: "jewelery"
    },
    {
  id: 4,
  name: "Women's Fashion",
  description: "Explore elegant fashion styles",
  image:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
  category: "women's clothing"
}
  ];

  const handleCategory = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="category-section">

      <div className="category-heading">
        <p>EXPLORE OUR COLLECTION</p>
        <h2>Shop By <span>Categories</span></h2>
        <h4>Find everything you need in one place.</h4>
      </div>

      <div className="category-container">

        {categories.map((item) => (

          <div className="category-card" key={item.id}>

            <div className="category-image">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="category-content">

              <h3>{item.name}</h3>

              <p>{item.description}</p>

              <button
                onClick={() => handleCategory(item.category)}
              >
                Shop Now →
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Category;
