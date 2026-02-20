import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <h2 style={styles.loading}>Loading...</h2>;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        
        {/* Image Section */}
        <div style={styles.imageWrapper}>
          <img
            src={product.image}
            alt={product.name}
            style={styles.image}
            onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
          />
        </div>

        {/* Details Section */}
        <div style={styles.details}>
          <h2 style={styles.name}>{product.name}</h2>
          <p style={styles.price}>₹{product.price}</p>

          {/* Quantity Selector */}
          <div style={styles.qtyContainer}>
            <button
              style={styles.qtyBtn}
              disabled={qty === 1}
              onClick={() => setQty(qty - 1)}
            >
              −
            </button>

            <span style={styles.qtyText}>{qty}</span>

            <button
              style={styles.qtyBtn}
              onClick={() => setQty(qty + 1)}
            >
              +
            </button>
          </div>

          {/* Add to Cart */}
          <button
            style={styles.cartBtn}
            onClick={() => {
              addToCart(product, qty);
              navigate("/cart");
            }}
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#000,#111)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px 15px",
  },

  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "40px",
    background: "#111",
    padding: "30px",
    borderRadius: "20px",
    maxWidth: "900px",
    width: "100%",
    boxShadow: "0 10px 30px rgba(255,255,255,0.08)",
  },

  imageWrapper: {
    flex: "1 1 300px",
    display: "flex",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    maxWidth: "350px",
    borderRadius: "16px",
    objectFit: "cover",
  },

  details: {
    flex: "1 1 300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  name: {
    color: "#fff",
    fontSize: "26px",
    marginBottom: "10px",
  },

  price: {
    color: "#ff9800",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
  },

  qtyContainer: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "25px",
  },

  qtyBtn: {
    background: "#222",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    fontSize: "18px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  qtyText: {
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
  },

  cartBtn: {
    background: "linear-gradient(135deg,#ff9800,#ff5722)",
    border: "none",
    padding: "12px",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#fff",
    fontSize: "15px",
  },

  loading: {
    textAlign: "center",
    color: "#fff",
    background: "#000",
    height: "100vh",
    paddingTop: "100px",
  },
};

export default ProductDetail;


