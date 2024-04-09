import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import './SignIn.css'; 

const SignIn = (props) => { // Pass onSignIn as a prop
  const [isSignIn, setIsSignIn] = useState(true); 
  const navigate = useNavigate(); 

  const handleSignUp = () => {
    setIsSignIn(true);
  };

  const handleSignIn = (userName) => {
    localStorage.setItem('userAuthenticated', true);
    setIsSignIn(false);
    navigate('/products');
    props.onSignIn(userName); // Call onSignIn here
  };

  return (
    <div className="signin-container">
      {/* <h1>Welcome</h1> */}
      {/* <p>Please select an option:</p> */}
      <div className="form-container">
        {isSignIn ? (
          <>
            <SignInForm onSignIn={handleSignIn} /> {/* Pass onSignIn as a prop */}
            <p>Don't have an account? <button className="toggle-btn" onClick={() => setIsSignIn(false)}>Sign Up</button></p> {/* Use handleSignUp */}
          </>
        ) : (
          <>
            <SignUpForm onSignUp={handleSignUp} /> {/* Pass handleSignUp as a prop */}
            <p>Already have an account? <button className="toggle-btn" onClick={() => setIsSignIn(true)}>Sign In</button></p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignIn;
