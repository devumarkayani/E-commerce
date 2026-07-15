import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "./Product.css";
import Footer from "./Components/Footer";
import { API_URL, getImageSrc } from "./utils/api";
import { getCart, setCart } from "./utils/storage";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/product`)
      .then((res) => {
        setProducts(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Could not load products. Is the server running?");
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    const cart = getCart();
    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      toast.error("Already in cart");
      return;
    }

    cart.push({
      ...product,
      cartId: product._id,
      image: getImageSrc(product.image),
    });
    setCart(cart);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="page-container">
      <div className="products-page-header">
        <h1>Our Products</h1>
        <p>Explore our full collection of quality items</p>
      </div>

      <div className="products">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-products">
            <p>No products in database yet. Featured items are on the home page.</p>
          </div>
        ) : (
          products.map((item, index) => (
            <motion.div
              className="card"
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <div className="card-image-wrap">
                <img
                  src={getImageSrc(item.image, `/products/image${(index % 3) + 1}.png`)}
                  alt={item.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `/products/image${(index % 3) + 1}.png`;
                  }}
                />
              </div>
              <h3>{item.name}</h3>
              <p>Rs. {Number(item.price).toLocaleString()}</p>
              <button type="button" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </motion.div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Products;
