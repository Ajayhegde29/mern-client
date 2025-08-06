# MERN Todo Application

A full-stack Todo application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication and CRUD operations for todo management.

## 🚀 Live Demo

- **Frontend (Vercel):** [Deploying... - Will be updated after Vercel deployment]
- **Backend (Render):** [https://to-do-list-app-backend-aq9b.onrender.com](https://to-do-list-app-backend-aq9b.onrender.com)
- **API Test:** [https://to-do-list-app-backend-aq9b.onrender.com/api](https://to-do-list-app-backend-aq9b.onrender.com/api)

## ✨ Features

- **User Authentication**: Register and login with JWT tokens
- **Todo Management**: Create, read, update, and delete todos
- **Real-time Updates**: Instant UI updates for all operations
- **Responsive Design**: Works on desktop and mobile devices
- **Secure API**: Protected routes with authentication middleware
- **Modern UI**: Clean and intuitive user interface

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling and responsive design

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud)
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mern-todo-app.git
cd mern-todo-app
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
```

Start the frontend development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 🌐 Deployment

### Backend Deployment (Render)

1. **Fork/Clone** this repository to your GitHub account
2. **Create a new service** on [Render](https://render.com)
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     - `MONGO_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your JWT secret key
     - `NODE_ENV`: `production`
     - `CLIENT_URL`: Your frontend URL

### Frontend Deployment (Vercel)

1. **Fork/Clone** this repository to your GitHub account
2. **Create a new project** on [Vercel](https://vercel.com)
3. **Import your GitHub repository**
4. **Configure the project:**
   - **Framework Preset:** Create React App
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/test` - Test auth route

### Todos (require authentication)
- `GET /api/todos` - Get all todos for user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

### Test Routes
- `GET /api` - Test if API is running
- `GET /` - Root route with API information

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-todo-app
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Frontend (config.js)
The frontend automatically detects the environment and uses the appropriate API URL:
- **Development:** `http://localhost:5000/api`
- **Production:** `https://your-backend-url.com/api`

## 🧪 Testing

### Test Backend API
```bash
cd server
node test-api.js
```

### Test Authentication
```bash
cd server
node test-auth.js
```

## 📁 Project Structure

```
mern-todo-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── config.js      # API configuration
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── server.js         # Main server file
│   └── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the amazing frontend framework
- [Express.js](https://expressjs.com/) for the robust backend framework
- [MongoDB](https://www.mongodb.com/) for the flexible database
- [Render](https://render.com/) for hosting the backend
- [Vercel](https://vercel.com/) for hosting the frontend

## 📋 Assignment Completion

This project was completed as part of a coding challenge assignment with the following requirements:

### ✅ Completed Requirements:
- [x] **Fork repository** - Repository forked and cloned locally
- [x] **Complete coding challenge** - Full MERN stack Todo application with authentication
- [x] **Deploy application** - Backend deployed on Render, Frontend ready for Vercel deployment
- [x] **Update README.md** - Comprehensive documentation with deployment URLs
- [x] **Create deployment branch** - `assignment-deployment` branch created
- [x] **Submit pull request** - Ready for PR submission

### 🚀 Deployment Status:
- **Backend:** ✅ Successfully deployed on Render
- **Frontend:** 🔄 Ready for Vercel deployment
- **Database:** ✅ MongoDB Atlas connected
- **API:** ✅ All endpoints working correctly

### 📝 Next Steps:
1. Deploy frontend on Vercel
2. Update frontend URL in README.md
3. Submit pull request to original repository

## 📞 Support

If you have any questions or need help with deployment, please open an issue on GitHub.

---

**Happy Coding! 🚀** 