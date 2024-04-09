// Example registration function in your frontend code

import { API_BASE_URL } from './apiConfig';

const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }

    // Registration successful
    return response.json();
  } catch (error) {
    console.error('Error during registration:', error.message);
    throw error;
  }
};

const login = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }

    // Registration successful
    return response.json();
  } catch (error) {
    console.error('Error during registration:', error.message);
    throw error;
  }
};

export { registerUser, login };
