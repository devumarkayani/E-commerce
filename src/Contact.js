import { useState } from "react";
import { toast } from "react-toastify";
import "./Contact.css";
import Footer from "./Components/Footer";

function Contact() {
  const [form, setForm] = useState({ name: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    toast.success(`Thanks ${form.name}! Your message has been sent.`);
    setForm({ name: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>We&apos;d love to hear from you. Reach out anytime!</p>
      </div>

      <div className="contact-content">
        <div className="contact-card">
          <div className="contact-item">
            <i className="fab fa-facebook facebook"></i>
            <a href="https://facebook.com/myshop.official" target="_blank" rel="noreferrer">
              Facebook: myshop.official
            </a>
          </div>

          <div className="contact-item">
            <i className="fab fa-instagram instagram"></i>
            <a href="https://instagram.com/myshop_official" target="_blank" rel="noreferrer">
              Instagram: @myshop_official
            </a>
          </div>

          <div className="contact-item">
            <i className="fab fa-whatsapp whatsapp"></i>
            <span>WhatsApp: 03488251576</span>
          </div>

          <a
            className="whatsapp-btn"
            href="https://wa.me/923488251576"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-whatsapp"></i> Chat on WhatsApp
          </a>

          <form className="contact-form" onSubmit={sendMessage}>
            <h3>Send us a message</h3>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
