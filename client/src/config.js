// Configuration for API URLs
const config = {
  // Development environment
  development: {
    API_URL: 'http://localhost:5000/api',
    BACKEND_URL: 'http://localhost:5000'
  },
  // Production environment
  production: {
    API_URL: 'https://to-do-list-app-backend-aq9b.onrender.com/api',
    BACKEND_URL: 'https://to-do-list-app-backend-aq9b.onrender.com'
  }
};

// Get current environment
const environment = process.env.NODE_ENV || 'development';

// Export the appropriate configuration
export const API_URL = config[environment].API_URL;
export const BACKEND_URL = config[environment].BACKEND_URL;

export default config[environment]; 