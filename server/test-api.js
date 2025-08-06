const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  try {
    console.log('🧪 Testing API endpoints...\n');

    // Test 1: Check if server is running
    console.log('1. Testing server connection...');
    const serverResponse = await axios.get(`${BASE_URL}`);
    console.log('✅ Server is running:', serverResponse.data);

    // Test 2: Test todo routes
    console.log('\n2. Testing todo routes...');
    const todoTestResponse = await axios.get(`${BASE_URL}/todos/test`);
    console.log('✅ Todo routes working:', todoTestResponse.data);

    // Test 3: Test auth routes
    console.log('\n3. Testing auth routes...');
    const authTestResponse = await axios.get(`${BASE_URL}/auth/test`);
    console.log('✅ Auth routes working:', authTestResponse.data);

    console.log('\n🎉 All tests passed! Your API is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure your server is running with: npm run dev');
    }
    
    if (error.response) {
      console.log('Response status:', error.response.status);
      console.log('Response data:', error.response.data);
    }
  }
}

// Run the test
testAPI(); 