import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  if (!product || !product._id) return null;

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <img
          src={product.image}
          alt={product.name}
          style={styles.image}
          onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
        />

        <div style={styles.content}>
          <h3 style={styles.name}>{product.name}</h3>
          <p style={styles.price}>₹{product.price}</p>

          <button
            style={{
              ...styles.button,
              background: product.stock === 0 ? "#444" : "#ff9800",
            }}
            disabled={product.stock === 0}
            onClick={() => navigate(`/product/${product._id}`)}
          >
            {product.stock === 0 ? "Out of Stock" : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  /* 👇 IMPORTANT: This centers card */
  wrapper: {
    display: "flex",
    justifyContent: "center",
  },

  card: {
    background: "#111",
    borderRadius: "14px",
    overflow: "hidden",
    width: "100%",
    maxWidth: "260px",
    boxShadow: "0 10px 25px rgba(255,255,255,0.08)",
    transition: "0.3s ease",
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },

  content: {
    padding: "14px",
    textAlign: "center",
  },

  name: {
    color: "#fff",
    fontSize: "16px",
    marginBottom: "6px",
  },

  price: {
    color: "#ff9800",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  button: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#000",
  },
};

export default ProductCard;

