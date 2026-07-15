import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-box">
          <h2>MyShop</h2>
          <p>
            Your trusted online store for fashion, accessories, and everyday essentials.
            Quality products, fast delivery, and great prices.
          </p>
        </div>

        <div className="footer-box">
          <h3>Quick Links</h3>
          <Link to="/home">Home</Link>
          <Link to="/product">Products</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart">Shopping Cart</Link>
        </div>

        <div className="footer-box">
          <h3>Contact</h3>
          <p><i className="fas fa-phone" style={{ marginRight: 8 }}></i>03488251576</p>
          <p><i className="fas fa-envelope" style={{ marginRight: 8 }}></i>myshop@gmail.com</p>
        </div>

        <div className="footer-box">
          <h3>Follow Us</h3>
          <div className="socials">
            <a href="https://facebook.com/myshop.official" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a href="https://instagram.com/myshop_official" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a href="https://wa.me/923488251576" target="_blank" rel="noreferrer">
              <i className="fab fa-whatsapp"></i> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <hr />
      <p className="copyright">&copy; 2026 MyShop. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
