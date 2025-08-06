import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <p>It might have been moved, deleted, or you entered the wrong URL.</p>
        
        <div className="not-found-actions">
          <Link to="/" className="home-button">
            Go to Home
          </Link>
          <Link to="/login" className="login-button">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;


