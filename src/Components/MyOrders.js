import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders/my-orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return <h2 style={styles.empty}>No orders yet 🛒</h2>;
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} style={styles.card}>
          <div style={styles.row}>
            <span>Order ID</span>
            <span>{order._id.slice(-6)}</span>
          </div>

          <div style={styles.row}>
            <span>Date</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>

          <div style={styles.total}>₹{order.totalPrice}</div>

          <div style={styles.items}>
            {order.items.map((item, i) => (
              <div key={i} style={styles.item}>
                {item.name} × {item.qty}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#000",
    padding: "16px",
  },
  heading: {
    color: "rgba(34, 28, 28, 0.01)313",
    textAlign: "center",
    marginBottom: "20px",
  },
  empty: {
    color: "#fff",
    textAlign: "center",
    marginTop: "40px",
  },
  card: {
    background: "#111",
    borderRadius: "14px",
    padding: "14px",
    marginBottom: "14px",
    boxShadow: "0 8px 20px rgba(255,255,255,0.08)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    color: "#ccc",
    fontSize: "14px",
    marginBottom: "6px",
  },
  total: {
    color: "#ff9800",
    fontWeight: "bold",
    fontSize: "18px",
    margin: "10px 0",
  },
  items: {
    borderTop: "1px solid #333",
    paddingTop: "8px",
  },
  item: {
    color: "#eee",
    fontSize: "14px",
  },
};

export default MyOrders;


