import React, { useState } from 'react';
import { login } from '../../api';
import './SignIn.css';

const SignInForm = ({ onSignIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    const email = formData.email;
    const password = formData.password;
    try {
      const response = await login({email, password});
      // sessionStorage.setItem("token", response.token);
      onSignIn(response.user);
    }
    catch(err) {
      console.log(err);
      alert('Invalid email or password');
    }

    // // Retrieve user data from localStorage
    // const userData = JSON.parse(localStorage.getItem('userData'));

    // // Check if the email and password match stored data
    // if (userData && userData.email === email && userData.password === password) {
    //   // Call the onSignIn callback passed from the parent component
    //   onSignIn();
    // } else {
    //   alert('Invalid email or password');
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>
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
      <button type="submit" className='toggle-btn'>Sign In</button>
    </form>
  );
};

export default SignInForm;
