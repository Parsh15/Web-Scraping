import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './loginui.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/signup/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const result = await response.json();
      console.log(result.terms);
      navigate('/welcome', { state: result });
    } catch (error) {
      console.log("Error due to:", error);
    }
  };

  return (
    <div className="login-page">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>

      <p className="signup-link">
        Don't have an account?{' '}
        <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}

export default Login;
