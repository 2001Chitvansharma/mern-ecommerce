
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/featured")
      .then((res) => {
        setProducts(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleViewAllProducts = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/products");
    } else {
      toast.warning("Please register to view products");
      navigate("/register");
    }
  };

  return (
    <div className="home-container">
      <h2 className="home-heading">Featured Products</h2>

      {loading ? (
        <p className="home-message">Loading products...</p>
      ) : (
        <div className="home-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="home-message">No products found</p>
          )}
        </div>
      )}

      <div className="home-button-wrapper">
        <button className="home-button" onClick={handleViewAllProducts}>
          View All Products
        </button>
      </div>
    </div>
  );
};

export default Home;