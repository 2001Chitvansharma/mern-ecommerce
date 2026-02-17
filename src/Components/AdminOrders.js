import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/orders/${id}/status`, {
      status,
    });

    setOrders(prev =>
      prev.map(o => (o._id === id ? { ...o, orderStatus: status } : o))
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Orders</h2>

      {orders.map(order => (
        <div key={order._id} style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "10px" }}>
          <p><b>Order ID:</b> {order._id}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>

          <select
            value={order.orderStatus}
            onChange={(e) => updateStatus(order._id, e.target.value)}
          >
            <option value="PLACED">PLACED</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;


