import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { clearSession, getRole } from "../utils/storage";

function Navbar({ role: roleProp }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(roleProp || getRole());

  useEffect(() => {
    setRole(roleProp || getRole());
  }, [location, roleProp]);

  const handleLogout = () => {
    clearSession();
    setRole("");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="left">
        <Link to="/home" className="logo" style={{ textDecoration: "none" }}>
          MyShop
        </Link>

        <div className="nav-links">
          <Link to="/home" className={isActive("/home") ? "active" : ""}>Home</Link>
          <Link to="/product" className={isActive("/product") ? "active" : ""}>Products</Link>
          <Link to="/about" className={isActive("/about") ? "active" : ""}>About</Link>
          <Link to="/contact" className={isActive("/contact") ? "active" : ""}>Contact</Link>
          <Link to="/cart" className={isActive("/cart") ? "active" : ""}>
            <i className="fas fa-shopping-cart" style={{ marginRight: 6 }}></i>
            Cart
          </Link>

          {role === "admin" && (
            <Link to="/admin" className={isActive("/admin") ? "active" : ""}>Admin</Link>
          )}
        </div>
      </div>

      <div className="right">
        <span className="user-greeting">
          Welcome, <span>{role === "admin" ? "Admin" : "Shopper"}</span>
        </span>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
