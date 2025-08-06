# MERN Todo App - Backend API

A robust RESTful API for a MERN stack Todo application with user authentication and CRUD operations for todo lists and items.

## 🚀 Features

- **User Authentication**: JWT-based authentication with registration and login
- **Todo Lists**: Create, read, update, and delete todo lists
- **Todo Items**: Add, toggle, and delete individual todo items
- **Data Validation**: Comprehensive input validation and error handling
- **Security**: Password hashing, JWT tokens, and middleware protection
- **Performance**: Database indexing and optimized queries

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-todo-app/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mern-todo-app
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development with nodemon
   npm run dev
   ```

## 📚 API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "email": "user@example.com"
  }
}
```

### Todo Lists

**Note:** All todo endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

#### Get All Todo Lists
```http
GET /api/todos
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "title": "My Todo List",
    "items": [
      {
        "_id": "60f7b3b3b3b3b3b3b3b3b3b4",
        "text": "Buy groceries",
        "completed": false
      }
    ],
    "completedCount": 0,
    "totalCount": 1,
    "createdAt": "2023-07-20T10:00:00.000Z",
    "updatedAt": "2023-07-20T10:00:00.000Z"
  }
]
```

#### Create Todo List
```http
POST /api/todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Todo List"
}
```

#### Update Todo List Title
```http
PATCH /api/todos/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Todo List Title"
}
```

#### Delete Todo List
```http
DELETE /api/todos/:id
Authorization: Bearer <token>
```

### Todo Items

#### Add Todo Item
```http
PUT /api/todos/:listId/items
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "New todo item"
}
```

#### Toggle Todo Item Completion
```http
PATCH /api/todos/:listId/items/:itemId
Authorization: Bearer <token>
```

#### Delete Todo Item
```http
DELETE /api/todos/:listId/items/:itemId
Authorization: Bearer <token>
```

## 🗄️ Database Schema

### User Schema
```javascript
{
  email: String (required, unique, validated),
  password: String (required, min 6 chars, hashed),
  timestamps: true
}
```

### TodoList Schema
```javascript
{
  userId: ObjectId (required, ref: User),
  title: String (required, max 100 chars),
  items: [TodoItem],
  timestamps: true
}
```

### TodoItem Schema
```javascript
{
  text: String (required, min 1 char),
  completed: Boolean (default: false),
  timestamps: true
}
```

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive validation for all inputs
- **CORS Protection**: Configurable CORS settings
- **Error Handling**: Secure error messages without exposing internals

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description",
  "error": "Detailed error information (development only)"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `500` - Internal Server Error

## 🧪 Testing

Test the API endpoints using tools like:
- Postman
- Insomnia
- curl
- Thunder Client (VS Code extension)

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `NODE_ENV` | Environment mode | `development` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:3000` |

## 🔧 Development

### Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Project Structure
```
server/
├── controllers/     # Business logic
├── middleware/      # Custom middleware
├── models/         # Database schemas
├── routes/         # API routes
├── server.js       # Main server file
└── package.json    # Dependencies
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository. 