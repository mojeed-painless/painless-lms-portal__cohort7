import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FcGoogle } from "react-icons/fc";
import pcalogo from '../assets/pcalogo.png';
import codeIllustration from '../assets/code-illustration.png';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(null);
  const [displayError, setDisplayError] = useState('');
  const [displaySuccess, setDisplaySuccess] = useState('');
  
  // Auth context for registration logic and state
  const { register, isLoading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // --- Redirection Effect ---
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

    useEffect(() => {
      if (error || message) {
        setDisplayError(error || message);
        const timer = setTimeout(() => {
          setDisplayError('');
        }, 5000);
  
        return () => clearTimeout(timer);
      }
    }, [error, message]);

    useEffect(() => {
      if (success) {
        setDisplaySuccess(success);
        const timer = setTimeout(() => {
          setDisplaySuccess('');
        }, 5000);

        return () => clearTimeout(timer);
      }
    }, [success]);

  // --- Form Submission Handler ---
  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage(null); // Clear local messages
    setSuccess(null);

    // 1. Client-Side Validation
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      await register(firstName, lastName, username, email, password, role);

      setSuccess('Registration successful! Please wait while your account status is being approved by an admin.');

      setFirstName('');
      setLastName('');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRole('student');

      setTimeout(() => {
          navigate('/login'); 
      }, 5000);

    } catch (err) {
      console.error(err); 
    }
  };

  return (
    <div className="auth-container register-container">
      <div className="right-info">
              <div className="info-logo">
                <img src={pcalogo} alt="academy logo" />
              </div>
      
              <div className="register-image">
                <img src={codeIllustration} alt="code illustration" />
              </div>
      </div>

      <div className="auth-card">
        <h2 className="auth-title">
          Create your account
        </h2>
        

        <div className={ displaySuccess ? "success-message" : ".auth-error-top"} role="alert">
            {displaySuccess}
        </div>

        <div className={ displayError ? "auth-error" : ".auth-error-top"} role="alert">
            {displayError}
        </div>


        <form className="auth-form" onSubmit={submitHandler}>
          <div className="auth-with-google register-auth">
            <button type="button" className="google-btn" >
              <FcGoogle size={20} style={{ marginRight: '8px' }} />
              Continue with Google
            </button>
            
            <div className="separator">
              <hr />
              <span>or</span>
            </div>
          </div>

          <div className="auth-form-group">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                required
                placeholder="Enter your First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                required
                placeholder="Enter your Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                required
                placeholder="Enter your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          
            <div>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                required
                placeholder="Enter your Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="role" className="auth-label">Joining as:</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="auth-select"
              >
                <option value="student">Student</option>
                {/* <option value="instructor">Instructor</option> */}
              </select>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                required
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                'Register'
              )}
            </button>
          </div>
        </form>

        {/* Link to Login */}
        <div className="auth-link">
          Already have an account?{' '}
          <Link to="/login" className="auth-link-text">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;