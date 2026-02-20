import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Our Products</h2>

      <div style={styles.grid}>
        {products.map(product => (
          <div key={product._id} style={styles.card}>
            <Link
              to={`/product/${product._id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <img src={product.image} alt={product.name} style={styles.image} />
              <h3 style={styles.productName}>{product.name}</h3>
            </Link>

            <p style={styles.price}>₹{product.price}</p>

            <button
              style={styles.button}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    background: "#0f0f0f",
    minHeight: "100vh",
    color: "white",
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "30px",
    letterSpacing: "1px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "25px",
  },
  card: {
    background: "#1a1a1a",
    padding: "18px",
    borderRadius: "12px",
    transition: "0.3s ease",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  productName: {
    marginTop: "12px",
    fontSize: "18px",
  },
  price: {
    marginTop: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#ff9800",
  },
  button: {
    marginTop: "12px",
    padding: "10px",
    width: "100%",
    background: "#ff9800",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
};

export default Products;