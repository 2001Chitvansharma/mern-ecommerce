import axios from "axios";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return navigate("/login");
    }

    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: cart,
          address,
          totalPrice: total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      clearCart();
      navigate("/my-orders");

    } catch (err) {
      console.error("ORDER ERROR:", err);

      alert(
        err.response?.data?.message ||
        "Server not reachable. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Checkout</h2>
        <p style={styles.sub}>Secure & fast delivery 🚀</p>

        <textarea
          placeholder="Enter full delivery address"
          style={styles.textarea}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div style={styles.totalBox}>
          <span>Total</span>
          <b>₹{total}</b>
        </div>

        <button
          style={{
            ...styles.btn,
            opacity: loading ? 0.7 : 1,
          }}
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order 🎉"}
        </button>
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
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "380px",
    background: "#111",
    padding: "28px",
    borderRadius: "22px",
    color: "#fff",
    boxShadow: "0 25px 50px rgba(0,0,0,0.7)",
  },

  heading: {
    textAlign: "center",
    fontSize: "26px",
    marginBottom: "6px",
  },

  sub: {
    textAlign: "center",
    fontSize: "14px",
    color: "#aaa",
    marginBottom: "18px",
  },

  textarea: {
    width: "100%",
    height: "110px",
    borderRadius: "14px",
    padding: "14px",
    background: "#000",
    color: "#fff",
    border: "1px solid #333",
    marginBottom: "18px",
    resize: "none",
  },

  totalBox: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 14px",
    background: "#000",
    borderRadius: "14px",
    border: "1px solid #222",
    marginBottom: "20px",
  },

  btn: {
    width: "100%",
    padding: "14px",
    borderRadius: "16px",
    background: "linear-gradient(135deg,#ff9800,#ff5722)",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Checkout;