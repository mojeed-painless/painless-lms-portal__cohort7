import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FcGoogle } from "react-icons/fc";
import { FaArrowRightLong } from "react-icons/fa6";
import pcalogo from '../assets/pcalogo.png';
import codeIllustration from '../assets/code-illustration.png';
import { GiNotebook } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { TbLockPassword } from "react-icons/tb";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";


const LoginScreen = () => {
  // Local state for form inputs
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  // const [screenContent, setScreenContent] = useState('');
  const [displayError, setDisplayError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Auth context for login logic and state
  const { login, isLoading, error, clearError, isAuthenticated } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || '/'; // Redirect to home or path before login

  // --- Effect for Redirection after Login ---
  useEffect(() => {
    // If the user is already authenticated (e.g., loaded from localStorage) 
    // or just successfully logged in, redirect them.
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  useEffect(() => {
    if (error) {
      setDisplayError(error);
      const timer = setTimeout(() => {
        setDisplayError('');
        if (typeof clearError === 'function') clearError();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  // --- Form Submission Handler ---
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Call the login function from AuthContext
      await login(identifier, password);
      // Redirection handled by useEffect
    } catch (err) {
      // Error handling is managed by AuthContext and displayed below
      console.error(err); 
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" id="login-form">

        <h2 className='auth-title'>Login to your account</h2>
        
        <div className={displayError ? "auth-error" : "auth-error-top"} role="alert"> {displayError} </div>

        <div className="smallNote">
          <span><GiNotebook /></span>
          Username and Password are case-sensitive
        </div>

        <form className="auth-form" onSubmit={submitHandler}>
        <div className="auth-form-group">
            <div>
              <label htmlFor="identifier">Username or Email</label>
              <span className='input-icon'><CgProfile /></span>
              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                placeholder="Username or Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password">
                Password
              </label>
              <span className='input-icon'><TbLockPassword /></span>
              <span className='eye-icon' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`auth-submit-btn ${isLoading ? 'disabled' : ''}`}
            >
              {isLoading ? (
                <div className="auth-spinner"></div>
              ) : (
                'Login'
              )}
            </button>
          </div>

          <div className="auth-with-google">
            <div className="separator">
              <hr />
              <span>or</span>
            </div>

            <button type="button" className="google-btn" >
              <FcGoogle size={20} style={{ marginRight: '8px' }} />
              Continue with Google
            </button>
          </div>
        </form>

        <div className="auth-link">
          Not a member?{' '}
          <Link to="/register" className="auth-link-text">
            Create an account
          </Link>
        </div>
      </div>

      <div className="right-info">
        <div className="info-logo">
          <img src={pcalogo} alt="academy logo" />
        </div>

        <div className="info-text">
          <h1>Welcome to Painless Code Academy</h1>
          <p>
            Enter your credentials <span className='showMore'>below</span> to access your account and 
            start/continue your learning journey with us.
            <a href="#login-form" className='login-form showMore'>
              <span>Login here</span>
              <FaArrowRightLong />
            </a>
          </p>

          <div className="note">
            <span><GiNotebook /></span>
            Username and Password are case-sensitive
          </div>
        </div>

        <div className="illustration-image">
          <img src={codeIllustration} alt="code illustration" />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;