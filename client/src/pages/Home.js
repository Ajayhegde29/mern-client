import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Organize Your Life
            <span className="highlight"> One Task at a Time</span>
          </h1>
          <p className="hero-subtitle">
            A simple, powerful todo app to help you stay focused and productive. 
            Create, manage, and complete your tasks with ease.
          </p>
          
          <div className="hero-buttons">
            <Link to="/register" className="cta-button primary">
              Get Started
            </Link>
            <Link to="/login" className="cta-button secondary">
              Sign In
            </Link>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="todo-preview">
            <div className="preview-header">
              <h3>My Tasks</h3>
            </div>
            <div className="preview-todos">
              <div className="preview-todo completed">
                <span className="checkmark">✓</span>
                <span>Complete project proposal</span>
              </div>
              <div className="preview-todo">
                <span className="checkbox">○</span>
                <span>Review code changes</span>
              </div>
              <div className="preview-todo">
                <span className="checkbox">○</span>
                <span>Schedule team meeting</span>
              </div>
              <div className="preview-todo">
                <span className="checkbox">○</span>
                <span>Update documentation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose Our Todo App?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Simple & Clean</h3>
            <p>Intuitive interface that helps you focus on what matters most - your tasks.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your data is protected with secure authentication and private storage.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast & Responsive</h3>
            <p>Lightning-fast performance that works seamlessly across all devices.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Real-time Sync</h3>
            <p>Your tasks sync instantly across all your devices and browsers.</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Get Organized?</h2>
        <p>Join thousands of users who have transformed their productivity with our todo app.</p>
        <Link to="/register" className="cta-button primary large">
          Start Organizing Today
        </Link>
      </div>
    </div>
  );
}

export default Home;
