import React, { useState } from "react";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({});

  const login = async () => {
    try {
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location = "/dashboard";
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="card p-4 bg-secondary" style={{ width: "350px" }}>
        <h3 className="text-center">Login</h3>

        <input className="form-control my-2" placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input className="form-control my-2" type="password" placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button className="btn btn-primary w-100 mt-2" onClick={login}>
          Login
        </button>

        <p className="mt-3 text-center">
          New user? <a href="/register" className="text-warning">Register</a>
        </p>
      </div>
    </div>
  );
}