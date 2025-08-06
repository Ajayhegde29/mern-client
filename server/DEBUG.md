# Debugging Guide for MERN Todo App

## 🚨 Current Issue: "Failed to add todo"

### Step 1: Check Server Status
1. Make sure your server is running:
   ```bash
   npm run dev
   ```

2. You should see:
   ```
   🚀 Server running on port 5000
   ✅ MongoDB connected successfully
   ```

### Step 2: Test API Endpoints
1. Install axios if not already installed:
   ```bash
   npm install axios
   ```

2. Run the test script:
   ```bash
   node test-api.js
   ```

### Step 3: Check Environment Variables
Make sure you have a `.env` file with:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-todo-app
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Step 4: Common Issues & Solutions

#### Issue 1: MongoDB Connection Failed
- Make sure MongoDB is running
- Check if the MONGO_URI is correct
- Try: `mongodb://127.0.0.1:27017/mern-todo-app`

#### Issue 2: Authentication Error
- Make sure you're logged in
- Check if the JWT token is being sent correctly
- Verify the Authorization header format: `Bearer <token>`

#### Issue 3: Route Not Found
- Check if the frontend is calling the correct API endpoint
- Verify the route structure in `routes/todos.js`

### Step 5: Frontend Debugging
1. Open browser developer tools (F12)
2. Check the Network tab when adding a todo
3. Look for:
   - Request URL
   - Request method (POST)
   - Request payload
   - Response status code
   - Response body

### Step 6: API Endpoints Reference

#### Create Todo List
```http
POST /api/todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Todo List"
}
```

#### Add Todo Item
```http
POST /api/todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Buy groceries",
  "listId": "<list-id>"
}
```

#### Get All Todos
```http
GET /api/todos
Authorization: Bearer <token>
```

### Step 7: Manual Testing with curl
```bash
# Test server
curl http://localhost:5000/api

# Test todo routes
curl http://localhost:5000/api/todos/test
```

### Step 8: Check Logs
Look for error messages in:
1. Server console
2. Browser console
3. Network tab in developer tools

### Step 9: Reset and Restart
If all else fails:
1. Stop the server (Ctrl+C)
2. Clear node_modules: `Remove-Item -Recurse -Force node_modules, package-lock.json`
3. Reinstall: `npm install`
4. Start server: `npm run dev`

## 🔧 Quick Fixes

### Fix 1: Update Frontend API Call
Make sure your frontend is calling the correct endpoint:
```javascript
// Instead of PUT, use POST
fetch('/api/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    text: 'Your todo text',
    listId: 'your-list-id' // or omit for new list
  })
})
```

### Fix 2: Check Authentication
Make sure you're logged in and have a valid token:
```javascript
// Check if token exists
const token = localStorage.getItem('token');
if (!token) {
  // Redirect to login
}
```

### Fix 3: Database Connection
If MongoDB isn't running:
1. Install MongoDB if not installed
2. Start MongoDB service
3. Or use MongoDB Atlas (cloud)

## 📞 Need More Help?
1. Check the server console for specific error messages
2. Look at the browser's Network tab for failed requests
3. Verify all environment variables are set correctly
4. Make sure all dependencies are installed 