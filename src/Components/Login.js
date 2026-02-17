import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

   
      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={submitHandler}>
        <h2 style={styles.heading}>Login</h2>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} type="submit">
          Login
        </button>
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

export default Login;