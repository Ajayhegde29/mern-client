# MERN Todo App

A beautiful, modern Todo application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## ✨ Features

- **User Authentication**: Register and login with email/password
- **Todo Management**: Add, edit, complete, and delete todos
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Real-time Updates**: Instant feedback for all actions
- **Persistent Data**: Todos are saved and persist between sessions
- **Mobile Responsive**: Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Mern_To_Do_app
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   CLIENT_URL=http://localhost:3000
   ```

5. **Start the development servers**

   **Terminal 1 - Start the backend server:**
   ```bash
   cd server
   npm start
   ```

   **Terminal 2 - Start the frontend:**
   ```bash
   cd client
   npm start
   ```

6. **Open your browser**
   
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## 📱 How to Use

1. **Register/Login**: Create an account or sign in with your email
2. **Add Todos**: Type your task and click "Add"
3. **Complete Todos**: Check the checkbox to mark as complete
4. **Delete Todos**: Click the "×" button to remove a todo
5. **Track Progress**: See how many todos you've completed

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Todos
- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## 🎨 Features

### Frontend
- **React Hooks**: Modern React with useState and useEffect
- **Axios**: HTTP client for API calls
- **Local Storage**: Persistent authentication
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: CSS transitions and hover effects

### Backend
- **Express.js**: Fast, unopinionated web framework
- **JWT Authentication**: Secure token-based auth
- **MongoDB/Mongoose**: Database and ODM
- **CORS**: Cross-origin resource sharing
- **Error Handling**: Comprehensive error management

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `JWT_SECRET` | JWT signing secret | Yes |
| `CLIENT_URL` | Frontend URL for CORS | No (default: http://localhost:3000) |
| `MONGO_URI` | MongoDB connection string | No (for development) |

### Database Setup

For production, you'll need to set up MongoDB:

1. **Local MongoDB**: Install MongoDB locally
2. **MongoDB Atlas**: Use cloud MongoDB service
3. **Add MONGO_URI** to your `.env` file

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
```

### Backend (Heroku/Railway)
```bash
cd server
npm start
```

## 📁 Project Structure

```
Mern_To_Do_app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js         # Main app component
│   │   ├── App.css        # Styles
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                 # Express backend
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── server.js         # Main server file
│   └── package.json
└── README.md
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the PORT in `.env` file
   - Kill existing processes: `taskkill /F /IM node.exe`

2. **CORS errors**
   - Ensure CLIENT_URL is set correctly in `.env`
   - Check that both servers are running

3. **Authentication issues**
   - Clear browser localStorage
   - Check JWT_SECRET is set

4. **Database connection**
   - For development, the app works without MongoDB
   - For production, ensure MONGO_URI is set

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Express.js for the backend framework
- MongoDB for the database
- All the open-source contributors

---

**Happy coding! 🎉** 