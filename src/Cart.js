import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "./Components/Footer";
import "./Cart.css";
import { getCart, setCart } from "./utils/storage";
import { getImageSrc } from "./utils/api";

function Cart() {
  const [cart, setCartState] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartState(getCart());
  }, []);

  const removeItem = (itemKey) => {
    const updated = cart.filter(
      (item) => item.cartId !== itemKey && item._id !== itemKey
    );
    setCartState(updated);
    setCart(updated);
    toast.error("Item removed from cart");
  };

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price || 0),
    0
  );

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>Your Shopping Cart</h2>
        <p>
          {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      <div className="cart-body">
        {cart.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">🛒</div>
            <p>Your cart is empty. Start shopping to fill it up!</p>
            <Link to="/product" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item) => {
                const itemKey = item.cartId || item._id;
                return (
                  <li key={itemKey} className="cart-item">
                    <img
                      src={getImageSrc(item.image)}
                      alt={item.name}
                      className="cart-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/products/image1.png";
                      }}
                    />
                    <div className="cart-info">
                      <h3>{item.name}</h3>
                      <p>Rs. {Number(item.price).toLocaleString()}</p>
                    </div>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeItem(itemKey)}
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>

            <Link to="/product" className="back-link">
              <i className="fas fa-arrow-left" /> Continue Shopping
            </Link>

            <div className="cart-summary">
              <h3>
                Total: <span>Rs. {totalPrice.toLocaleString()}</span>
              </h3>
              <button
                type="button"
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
