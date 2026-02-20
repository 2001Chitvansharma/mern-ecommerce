import { useEffect, useState } from "react";
import api from "../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get(`${process.env.REACT_APP_API_URL}`).then(res => setOrders(res.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders</h2>

      {orders.map(order => (
        <div key={order._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p>Status: {order.status}</p>
          <p>Total: ₹{order.totalPrice}</p>
          {order.items.map(i => (
            <p key={i.productId}>{i.name} × {i.qty}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;
