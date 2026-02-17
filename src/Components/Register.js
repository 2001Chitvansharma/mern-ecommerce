import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/register", {
      name,
      email,
      password,
    });
    navigate("/login");
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={submitHandler}>
        <h2 style={styles.heading}>Create Account</h2>

        <input
          style={styles.input}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button style={styles.button}>Register</button>
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
  },
  card: {
    background: "#111",
    padding: "24px",
    borderRadius: "14px",
    width: "100%",
    maxWidth: "360px",
    boxShadow: "0 10px 30px rgba(255,255,255,0.1)",
  },
  heading: {
    color: "#fff",
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#ff9800",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
  },
};

export default Register;