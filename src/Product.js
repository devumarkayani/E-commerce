import "./Product.css";
import Footer from "./Components/Footer";

function Products() {

  const products = [
    { id: 1, name: "Bag", price: 50, image: "/bag.jfif" },
    { id: 2, name: "Shoes", price: 50, image: "/shoes.jfif" },
    { id: 3, name: "Shirt", price: 50, image: "/shirt.jfif" },
    { id: 4, name: "Jeans", price: 50, image: "/Jeans.jfif" },
    { id: 5, name: "Belt", price: 50, image: "/belt.jfif" },
    { id: 6, name: "Jackets", price: 50, image: "/jackets.jfif" },
    { id: 7, name: "Cap", price: 50, image: "/cap.jfif" },
    { id: 8, name: "Glasses", price: 50, image: "/glasses.jfif" },
    { id: 9, name: "Wallet", price: 50, image: "/wallet.jfif" },
    { id: 10, name: "Sneakers", price: 50, image: "/sneakers.jfif" },
    { id: 11, name: "T-Shirt", price: 50, image: "/tshirt.jfif" },
    { id: 12, name: "Perfume", price: 50, image: "/perfume.jfif" },
    { id: 13, name: "Hoodie", price: 50, image: "/hoodies.jfif" }
  ];

  // ADD TO CART
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="page-container">

      <div className="products">

        {products.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>${item.price}</p>

            <button onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}

      </div>

      <Footer />

    </div>
  );
}

export default Products;