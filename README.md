# Real-time Chat Application

A full-stack real-time chat application built with Node.js, Socket.io, Next.js, and TypeScript. Features user authentication, real-time messaging, and user status tracking.

## ✨ Features

- **Real-time messaging** - Instant message delivery using Socket.io
- **User authentication** - Secure login and registration system with Passport.js
- **User status tracking** - See when users are online/offline
- **Responsive design** - Modern UI built with Next.js and Tailwind CSS
- **TypeScript** - Full type safety across frontend and backend
- **Docker support** - Easy deployment with Docker Compose

## 🚀 Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe JavaScript
- **Socket.io** - Real-time bidirectional event-based communication
- **Express.js** - Web application framework
- **Passport.js** - Authentication middleware
- **Database** - (Configuration in backend/src/config/db.ts)

### Frontend

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.io Client** - Real-time communication
- **Shadcn/ui** - UI component library

## 📋 Prerequisites

Before running this application, make sure you have:

- **Docker** and **Docker Compose** installed on your system
- **Git** for cloning the repository

## 🛠️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/pietrogoncalvess/realtime-chat-js.git
   cd realtime-chat-js
   ```

2. **Start the application**

   ```bash
   docker-compose up
   ```

   This command will:

   - Build and start both frontend and backend services
   - Set up the database (if configured)
   - Start the development servers

3. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000` (or configured port)

## 🎯 Usage

1. **Register a new account** at `http://localhost:3000/register`
2. **Login** with your credentials
3. **Start chatting** - Messages are delivered in real-time to all connected users
4. **View online users** - See who's currently active in the chat
5. **Logout** when finished

## 📁 Project Structure

```
├── backend/                 # Node.js backend server
│   ├── src/
│   │   ├── app.ts          # Express app configuration
│   │   ├── server.ts       # Server entry point
│   │   ├── config/         # Database, passport, session config
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Data models (User, Message, UserStatus)
│   │   ├── modules/        # Feature modules (chat, users)
│   │   ├── routes/         # API routes
│   │   ├── shared/         # Shared utilities (socket, container)
│   │   └── utils/          # Helper functions
│   ├── dockerfile          # Backend Docker configuration
│   └── package.json        # Backend dependencies
│
├── frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React components
│   │   ├── lib/          # Utility functions
│   │   └── services/     # API and socket services
│   ├── dockerfile        # Frontend Docker configuration
│   └── package.json      # Frontend dependencies
│
└── docker-compose.yml    # Docker Compose configuration
```

## 🔧 Development

### Running without Docker

If you prefer to run the services individually:

**Backend:**

```bash
cd backend
npm install
npm run dev
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Make sure to configure any necessary environment variables for:

- Database connection
- Session secrets
- JWT secrets (if used)
- CORS settings

## 🌐 API Endpoints

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/logout` - User logout
- `POST /api/chat/messages` - Send message
- `GET /api/chat/messages` - Get chat history

## 🔄 Real-time Events

The application uses Socket.io for real-time communication:

- `connection` - User connects to chat
- `disconnect` - User leaves chat
- `message` - New message sent/received
- `user_status` - User online/offline status updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

- **Pietro Gonçalves** - [@pietrogoncalvess](https://github.com/pietrogoncalvess)

---

⭐ Star this repository if you found it helpful!
