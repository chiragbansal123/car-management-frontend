import React, { useState } from 'react';
import './styles.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/signup
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '' });
    setError('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { email, password } = formData;
    if (!email.includes('@')) return 'Please enter a valid email.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
      alert(isLogin ? 'Logged in successfully!' : 'Account created successfully!');
    }, 2000);
  };

  return (
    <div className="login-signup-container">
      <div className="form-container">
        <div className="form-header">
          <button
            className={isLogin ? 'active' : ''}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? 'active' : ''}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <i
              className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="link" onClick={toggleForm}>
          {isLogin ? 'Don’t have an account? Sign Up' : 'Already have an account? Login'}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
