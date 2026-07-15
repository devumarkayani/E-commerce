import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";
import { getCart, getUserId } from "../utils/storage";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCart());
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const paymentOptions = [
    "Cash on Delivery",
    "Credit/Debit Card",
    "Online Wallet",
  ];

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!address) {
      alert("Enter delivery address");
      return;
    }

    if (!paymentMethod) {
      alert("Select payment method");
      return;
    }

    if (paymentMethod === "Credit/Debit Card") {
      if (
        !cardDetails.number ||
        !cardDetails.name ||
        !cardDetails.expiry ||
        !cardDetails.cvv
      ) {
        alert("Enter complete card details");
        return;
      }

      if (cardDetails.cvv.length !== 3) {
        alert("Invalid CVV");
        return;
      }
    }

    try {
      const orderData = {
        userId: getUserId() || "guest",
        cart,
        totalPrice,
        address,
        paymentMethod,
      };

      const res = await axios.post(
        "http://localhost:5001/api/order",
        orderData
      );

      if (res.data) {
        alert("Order Placed Successfully!");
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/product", { replace: true });
      }
    } catch (error) {
      console.log(error);
      alert("Order failed");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your order in just a few steps</p>
      </div>

      <div className="checkout-layout">
        <div className="checkout-left">
          <div className="checkout-box">
            <h3><i className="fas fa-map-marker-alt"></i> Delivery Address</h3>
            <textarea
              className="checkout-textarea"
              placeholder="Enter your full delivery address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="checkout-box">
            <h3><i className="fas fa-credit-card"></i> Payment Method</h3>

            {paymentOptions.map((p, i) => (
              <div
                key={i}
                onClick={() => setPaymentMethod(p)}
                className={`pay-card ${paymentMethod === p ? "selected" : ""}`}
              >
                {p}
              </div>
            ))}

            {paymentMethod === "Credit/Debit Card" && (
              <div className="card-form">
                <h4>Enter Card Details</h4>

                <input
                  className="checkout-input"
                  placeholder="Card Number"
                  value={cardDetails.number}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, number: e.target.value })
                  }
                />

                <input
                  className="checkout-input"
                  placeholder="Card Holder Name"
                  value={cardDetails.name}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, name: e.target.value })
                  }
                />

                <div className="card-row">
                  <input
                    className="checkout-input"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, expiry: e.target.value })
                    }
                  />
                  <input
                    className="checkout-input"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, cvv: e.target.value })
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="checkout-summary">
          <h3><i className="fas fa-shopping-bag"></i> Order Summary</h3>

          {cart.map((item, i) => (
            <div key={i} className="summary-row">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </div>
          ))}

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>

          <button className="place-order-btn" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
