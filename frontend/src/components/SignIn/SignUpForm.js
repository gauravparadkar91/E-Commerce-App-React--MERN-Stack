import React, { useState } from 'react';
import { registerUser } from '../../api';
import './SignIn.css';

const SignUpForm = ({ onSignUp }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };

    try {
      const response = await registerUser(userData);
      console.log('Registration successful:', response);
      // Handle successful registration (e.g., redirect to login page)
      // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    // Call the onSignUp callback passed from the parent component
    onSignUp();
    } catch (error) {
      console.error('Registration failed:', error.message);
      // Handle registration failure (e.g., display error message to user)
    }
    
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div className='fields-container'>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className='fields-container'>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className='fields-container'>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className='fields-container'>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className='toggle-btn'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
