import "./About.css";
import Footer from "./Components/Footer";

function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About MyShop</h1>
        <p>Your trusted destination for quality products and exceptional service</p>
      </div>

      <div className="about-content">
        <div className="about-card">
          <p>
            Welcome to <b>MyShop</b>, your trusted online shopping destination.
            We provide high-quality products at affordable prices including shoes,
            clothing, accessories, and more.
          </p>

          <p>
            Our goal is to make online shopping easy, fast, and reliable for everyone.
            We focus on customer satisfaction and always try to deliver the best experience.
          </p>

          <p>
            At MyShop, we believe in quality, trust, and convenience.
            Thank you for choosing us for your shopping needs!
          </p>
        </div>

        <div className="values-grid">
          <div className="value-item">
            <div className="value-icon">⭐</div>
            <h3>Quality First</h3>
            <p>Every product is carefully selected for quality</p>
          </div>
          <div className="value-item">
            <div className="value-icon">🤝</div>
            <h3>Trust &amp; Transparency</h3>
            <p>Honest pricing and reliable service</p>
          </div>
          <div className="value-item">
            <div className="value-icon">💜</div>
            <h3>Customer Love</h3>
            <p>Your satisfaction is our top priority</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
