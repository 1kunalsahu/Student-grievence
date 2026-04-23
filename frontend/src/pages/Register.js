import React, { useState } from "react";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({});

  const register = async () => {
    try {
      await API.post("/register", form);
      alert("Registered Successfully");
      window.location = "/";
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="card p-4 bg-secondary" style={{ width: "350px" }}>
        <h3 className="text-center">Register</h3>

        <input className="form-control my-2" placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input className="form-control my-2" placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input className="form-control my-2" type="password" placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <input className="form-control my-2" placeholder="Course"
          onChange={e => setForm({ ...form, course: e.target.value })}
        />

        <button className="btn btn-success w-100 mt-2" onClick={register}>
          Register
        </button>

        <p className="mt-3 text-center">
          Already have account? <a href="/" className="text-warning">Login</a>
        </p>
      </div>
    </div>
  );
}