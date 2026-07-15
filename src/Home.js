import Footer from "./Components/Footer";
import { motion } from "framer-motion";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, getImageSrc } from "./utils/api";
import { getCart, setCart } from "./utils/storage";

const FALLBACK_PRODUCTS = [
  {
    cartId: "featured-1",
    name: "Premium Laptop",
    price: 50000,
    image: "/products/image1.png",
  },
  {
    cartId: "featured-2",
    name: "Gaming Laptop",
    price: 65000,
    image: "/products/image2.png",
  },
  {
    cartId: "featured-3",
    name: "Business Laptop",
    price: 55000,
    image: "/products/image3.png",
  },
  {
    cartId: "featured-4",
    name: "Ultrabook Pro",
    price: 72000,
    image: "/products/image1.png",
  },
];

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/product`)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setProducts(
            res.data.slice(0, 4).map((item, index) => ({
              ...item,
              cartId: item._id || `api-${index}`,
              image: getImageSrc(item.image, `/products/image${(index % 3) + 1}.png`),
            }))
          );
        }
      })
      .catch(() => {
        setProducts(FALLBACK_PRODUCTS);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleShopNow = () => {
    toast.success("Browse our full collection!");
    setTimeout(() => navigate("/product"), 600);
  };

  const addToCart = (product) => {
    const cart = getCart();
    const cartId = product._id || product.cartId || `local-${Date.now()}`;
    const exists = cart.some(
      (item) => item._id === product._id || item.cartId === cartId
    );

    if (exists) {
      toast.info(`${product.name} is already in your cart`);
      return;
    }

    cart.push({
      ...product,
      cartId,
      image: getImageSrc(product.image, product.image),
    });
    setCart(cart);
    toast.success(`${product.name} added to cart`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="home-page">
      <motion.section
        className="hero"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="hero-content">
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            New arrivals every week
          </motion.span>
          <h1>Discover Style That Fits Your Life</h1>
          <p>
            Shop premium fashion, footwear, and accessories at unbeatable
            prices. Fast delivery and hassle-free returns.
          </p>
          <motion.button
            onClick={handleShopNow}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Shop Now
          </motion.button>
        </div>
      </motion.section>

      <motion.div
        className="features-strip"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="feature-item">
          <div className="feature-icon">🚚</div>
          <h4>Free Shipping</h4>
          <p>On orders over Rs. 5000</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🔒</div>
          <h4>Secure Payment</h4>
          <p>100% protected checkout</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">↩️</div>
          <h4>Easy Returns</h4>
          <p>30-day return policy</p>
        </div>
      </motion.div>

      <section className="products-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Hand-picked favorites just for you</p>
        </div>

        {loading ? (
          <div className="home-loading">
            <div className="loading-spinner" />
            <p>Loading featured products...</p>
          </div>
        ) : (
          <motion.div
            className="products"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((product) => (
              <motion.div
                className="card"
                key={product.cartId || product._id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <div className="card-image-wrap">
                  <img
                    src={getImageSrc(product.image, product.image)}
                    alt={product.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/products/image1.png";
                    }}
                  />
                </div>
                <h3>{product.name}</h3>
                <p>Rs. {Number(product.price).toLocaleString()}</p>
                <button type="button" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Home;
