// ✅ FILE: client/src/App.js

import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';

// ✅ Updated API base URL to point to your Render backend
const API_BASE_URL = 'https://to-do-app-8je5.onrender.com/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [authMode, setAuthMode] = useState('login');
  const [authData, setAuthData] = useState({ email: '', password: '' });

  const todoInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchTodos();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && todoInputRef.current) {
      todoInputRef.current.focus();
    }
  }, [isAuthenticated]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = authMode === 'login' ? '/auth/login' : '/auth/register';
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, authData);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setIsAuthenticated(true);
        setUser(response.data.user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        fetchTodos();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setTodos([]);
    delete axios.defaults.headers.common['Authorization'];
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos`);
      setTodos(response.data);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, { text: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo('');
      if (todoInputRef.current) todoInputRef.current.focus();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add todo');
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t._id === id);
      const response = await axios.put(`${API_BASE_URL}/todos/${id}`, {
        completed: !todo.completed
      });
      setTodos(todos.map(t => t._id === id ? response.data : t));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${id}`);
      setTodos(todos.filter(t => t._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete todo');
    }
  };

  const handleTodoInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAuthInputChange = (field, value) => {
    setAuthData(prev => ({ ...prev, [field]: value }));
  };

  const AuthForm = () => (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="auth-subtitle">
          {authMode === 'login' ? 'Sign in to manage your todos' : 'Join us to start organizing your tasks'}
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleAuth} className="auth-form">
          <div className="form-group">
            <input
              ref={emailInputRef}
              type="email"
              placeholder="Email"
              value={authData.email}
              onChange={(e) => handleAuthInputChange('email', e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              ref={passwordInputRef}
              type="password"
              placeholder="Password"
              value={authData.password}
              onChange={(e) => handleAuthInputChange('password', e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? 'Loading...' : (authMode === 'login' ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="switch-button"
            >
              {authMode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const TodoApp = () => (
    <div className="todo-container">
      <header className="todo-header">
        <div className="header-content">
          <h1>✨ My Todo App</h1>
          <div className="user-info">
            <span>Welcome, {user?.email}</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        </div>
      </header>

      <main className="todo-main">
        <div className="todo-card">
          <form onSubmit={addTodo} className="add-todo-form">
            <input
              ref={todoInputRef}
              type="text"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={handleTodoInputChange}
              className="todo-input"
              autoFocus
            />
            <button type="submit" className="add-button">Add</button>
          </form>

          {error && <div className="error-message">{error}</div>}

          <div className="todos-list">
            {todos.length === 0 ? (
              <div className="empty-state">
                <p>No todos yet. Add one above to get started!</p>
              </div>
            ) : (
              todos.map(todo => (
                <div key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo._id)}
                      className="todo-checkbox"
                    />
                    <span className="todo-text">{todo.text}</span>
                  </div>
                  <button onClick={() => deleteTodo(todo._id)} className="delete-button">×</button>
                </div>
              ))
            )}
          </div>

          {todos.length > 0 && (
            <div className="todo-stats">
              <span>{todos.filter(t => t.completed).length} of {todos.length} completed</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );

  return (
    <div className="App">
      {isAuthenticated ? <TodoApp /> : <AuthForm />}
    </div>
  );
}

export default App;
