import { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";
import { getToken } from "../utils/storage";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const token = getToken();

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/product");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/order");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5001/api/product",
        newProduct,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProducts([...products, res.data.product]);
      setNewProduct({ name: "", price: "", image: "" });
      alert("Product added");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
      alert("Product deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/order/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.filter((o) => o._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const totalRevenue = orders.reduce(
    (sum, o) => sum + Number(o.totalPrice || 0),
    0
  );

  return (
    <div className="admin-page">
      <div className="admin-inner">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage your ecommerce store</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h2>{products.length}</h2>
            <p>Total Products</p>
          </div>
          <div className="stat-card">
            <h2>{orders.length}</h2>
            <p>Total Orders</p>
          </div>
          <div className="stat-card">
            <h2>—</h2>
            <p>Total Users</p>
          </div>
          <div className="stat-card">
            <h2>${totalRevenue}</h2>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className="admin-section">
          <h2>Add Product</h2>
          <div className="admin-form">
            <input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <input
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <input
              placeholder="Image filename"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <button className="admin-btn" onClick={addProduct}>
              Add Product
            </button>
          </div>
        </div>

        <div className="admin-section">
          <h2>Orders</h2>
          {orders.length === 0 ? (
            <p style={{ color: "var(--text-muted)" }}>No orders yet.</p>
          ) : (
            orders.map((order, i) => (
              <div key={i} className="order-card">
                <p><b>ID:</b> {order._id}</p>
                <p><b>Total:</b> ${order.totalPrice}</p>
                <p><b>Address:</b> {order.address}</p>
                <p><b>Payment:</b> {order.paymentMethod}</p>
                <button
                  className="admin-btn admin-btn-danger"
                  onClick={() => deleteOrder(order._id)}
                >
                  Delete Order
                </button>
              </div>
            ))
          )}
        </div>

        <div className="admin-section">
          <h2>Products</h2>
          <div className="product-grid">
            {products.map((p) => (
              <div key={p._id} className="admin-product-card">
                <img
                  src={`http://localhost:5001/images/${p.image}`}
                  alt={p.name}
                />
                <h3>{p.name}</h3>
                <p className="admin-price">${p.price}</p>
                <button
                  className="admin-btn admin-btn-danger"
                  onClick={() => deleteProduct(p._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
