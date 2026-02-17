import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.qty * i.price, 0);

  if (cart.length === 0) {
    return (
      <div style={styles.page}>
        <div style={styles.empty}>
          <h2>Your cart is empty 🛒</h2>
          <p>Add some products to continue</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Your Cart</h2>

      <div style={styles.list}>
        {cart.map((item) => (
          <div key={item._id} style={styles.item}>
            <img src={item.image} alt={item.name} style={styles.image} />

            <div style={styles.info}>
              <h3>{item.name}</h3>
              <p style={styles.price}>₹{item.price}</p>

              <div style={styles.qty}>
                <button
                  style={styles.qtyBtn}
                  onClick={() => decreaseQty(item._id)}
                >
                  −
                </button>
                <span>{item.qty}</span>
                <button
                  style={styles.qtyBtn}
                  onClick={() => increaseQty(item._id)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              style={styles.remove}
              onClick={() => removeFromCart(item._id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div style={styles.summary}>
        <div>
          <p>Total Items</p>
          <b>{totalItems}</b>
        </div>

        <div>
          <p>Total Price</p>
          <b>₹{totalPrice}</b>
        </div>

        <button
          style={styles.checkout}
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#000,#111)",
    padding: "20px",
    color: "#fff",
  },

  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "26px",
  },

  empty: {
    textAlign: "center",
    marginTop: "80px",
    opacity: 0.8,
  },

  list: {
    maxWidth: "900px",
    margin: "0 auto",
  },

  item: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    background: "#111",
    padding: "16px",
    borderRadius: "18px",
    marginBottom: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
  },

  image: {
    width: "90px",
    height: "90px",
    borderRadius: "14px",
    objectFit: "cover",
    flexShrink: 0,
  },

  info: {
    flex: 1,
  },

  price: {
    color: "#ff9800",
    margin: "6px 0",
    fontWeight: "bold",
  },

  qty: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "10px",
  },

  qtyBtn: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    background: "#222",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
  },

  remove: {
    background: "transparent",
    border: "none",
    color: "#ff4d4f",
    fontSize: "20px",
    cursor: "pointer",
  },

  summary: {
    maxWidth: "900px",
    margin: "30px auto 0",
    background: "#111",
    padding: "20px",
    borderRadius: "20px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    alignItems: "center",
  },

  checkout: {
    gridColumn: "1 / -1",
    padding: "14px",
    marginTop: "10px",
    borderRadius: "30px",
    border: "none",
    background: "linear-gradient(135deg,#ff9800,#ff5722)",
    color: "#000",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Cart;