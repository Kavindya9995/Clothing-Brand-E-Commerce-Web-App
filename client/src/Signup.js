import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = isLogin
        ? "http://localhost:4000/api/auth/login"
        : "http://localhost:4000/api/auth/register";

      const bodyData = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // ✅ Save token if provided by backend
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      console.log(isLogin ? "Login success" : "Register success", data);

      // Example: Immediately fetch user profile or protected data with token
      if (data.token) {
        const profileRes = await fetch("http://localhost:4000/api/user/profile", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${data.token}`, // ✅ use token here
          },
        });

        const profileData = await profileRes.json();
        console.log("User Profile:", profileData);
      }

      // Navigate after successful login/register
      navigate("/product");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.wrap}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={{ marginBottom: 16 }}>{isLogin ? "Login" : "Sign Up"}</h2>

        {!isLogin && (
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {error && <p style={{ color: "red", fontSize: 14 }}>{error}</p>}

        <button type="submit" style={styles.btn}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p style={{ marginTop: 12, textAlign: "center" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: "#2563eb", cursor: "pointer", fontWeight: 500 }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
}

const styles = {
  wrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f6f7fb",
  },
  card: {
    width: 320,
    padding: 24,
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: 12,
    border: "1px solid #dcdfe6",
    borderRadius: 8,
  },
  btn: {
    width: "100%",
    padding: "10px 12px",
    border: 0,
    borderRadius: 8,
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },
};
