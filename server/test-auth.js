const axios = require('axios');

const BASE_URL = 'https://to-do-list-app-backend-aq9b.onrender.com/api';

async function testAuth() {
  try {
    console.log('🧪 Testing Authentication...\n');

    // Test 1: Check if server is running
    console.log('1. Testing server connection...');
    const serverResponse = await axios.get(`${BASE_URL}`);
    console.log('✅ Server is running:', serverResponse.data);

    // Test 2: Register a new user
    console.log('\n2. Testing user registration...');
    const registerData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    try {
      const registerResponse = await axios.post(`${BASE_URL}/auth/register`, registerData);
      console.log('✅ User registered:', registerResponse.data);
    } catch (error) {
      if (error.response && error.response.data.message === 'User already exists') {
        console.log('ℹ️ User already exists, proceeding to login test...');
      } else {
        console.log('❌ Registration failed:', error.response?.data || error.message);
        return;
      }
    }

    // Test 3: Login with the user
    console.log('\n3. Testing user login...');
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    try {
      const loginResponse = await axios.post(`${BASE_URL}/auth/login`, loginData);
      console.log('✅ Login successful:', {
        token: loginResponse.data.token ? 'Token received' : 'No token',
        user: loginResponse.data.user
      });
    } catch (error) {
      console.log('❌ Login failed:', error.response?.data || error.message);
    }

    // Test 4: Test with wrong password
    console.log('\n4. Testing login with wrong password...');
    const wrongPasswordData = {
      email: 'test@example.com',
      password: 'wrongpassword'
    };
    
    try {
      const wrongPasswordResponse = await axios.post(`${BASE_URL}/auth/login`, wrongPasswordData);
      console.log('❌ This should have failed but succeeded:', wrongPasswordResponse.data);
    } catch (error) {
      if (error.response && error.response.data.message === 'Invalid credentials') {
        console.log('✅ Correctly rejected wrong password');
      } else {
        console.log('❌ Unexpected error:', error.response?.data || error.message);
      }
    }

    console.log('\n🎉 Authentication tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure your server is running on Render');
    }
    
    if (error.response) {
      console.log('Response status:', error.response.status);
      console.log('Response data:', error.response.data);
    }
  }
}

// Run the test
testAuth(); 