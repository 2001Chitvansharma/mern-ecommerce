import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
    setOpen(false);
  };

  return (
    <>
      <nav style={styles.nav}>
        <h2 style={styles.logo}>MERN Shop</h2>

        
        <div
          className="hamburger"
          onClick={() => setOpen(!open)}
        >
          ☰
        </div>

        <ul
          className={`navMenu ${open ? "active" : ""}`}
          style={styles.ul}
        >
          <li>
            <Link to="/" className="navLink" onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>

          {token && (
            <>
              <li>
                <Link to="/products" className="navLink" onClick={() => setOpen(false)}>
                  Products
                </Link>
              </li>

              <li>
                <Link to="/my-orders" className="navLink" onClick={() => setOpen(false)}>
                  My Orders
                </Link>
              </li>

              <li>
                <Link to="/cart" className="navLink" onClick={() => setOpen(false)}>
                  🛒 Cart ({cart.length})
                </Link>
              </li>

              <li>
                <button onClick={handleLogout} style={styles.logout}>
                  Logout
                </button>
              </li>
            </>
          )}

          {!token && (
            <>
              <li>
                <Link to="/login" className="navLink" onClick={() => setOpen(false)}>
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" className="navLink" onClick={() => setOpen(false)}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <style>{`
        .navLink {
          position: relative;
          text-decoration: none;
          color: white;
          font-size: 15px;
          font-weight: 500;
          padding: 5px 0;
          transition: color 0.3s ease;
        }

        .navLink::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -3px;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg,#ff9800,#ff5722);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .navLink:hover {
          color: #ff9800;
        }

        .navLink:hover::after {
          width: 100%;
        }

        /* Hamburger default hidden */
        .hamburger {
          display: none;
          font-size: 26px;
          cursor: pointer;
        }

        /* Mobile */
        @media (max-width: 768px) {

          .hamburger {
            display: block;
          }

          .navMenu {
            display: none !important;
            flex-direction: column;
            background: #111;
            position: absolute;
            top: 60px;
            right: 0;
            width: 100%;
            padding: 20px 0;
            text-align: center;
            gap: 20px;
          }

          .navMenu.active {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    background: "#000",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    margin: 0,
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  ul: {
    display: "flex",
    listStyle: "none",
    gap: "24px",
    margin: 0,
    padding: 0,
    alignItems: "center",
  },
  logout: {
    background: "#ff3b3b",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "8px",
    fontSize: "14px",
  },
};

export default Navbar;