import { useState } from "react";
import axios from "axios";

function AdminAddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    stock: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/products", form);
    alert("Product added");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h2>Add Product</h2>

      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Price" onChange={e => setForm({ ...form, price: e.target.value })} />
      <input placeholder="Image URL" onChange={e => setForm({ ...form, image: e.target.value })} />
      <input placeholder="Stock" onChange={e => setForm({ ...form, stock: e.target.value })} />

      <button>Add</button>
    </form>
  );
}

export default AdminAddProduct;
