import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and Password required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", "true");
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role?.toLowerCase() || "user");
      localStorage.setItem("userId", data.user.id || "");

      toast.success("Login Successful!");
      navigate("/home");
    } catch (error) {
      console.log("Login Error:", error);
      toast.error("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-brand">MyShop</div>
        <h2>Welcome back! Sign in to continue</h2>

        <input
          type="email"
          className="form-input"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <button className="signin-btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="register-link">
          Don&apos;t have an account?{" "}
          <span onClick={() => navigate("/register")}>Create one</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
