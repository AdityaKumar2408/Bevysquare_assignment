
# Todo App

A responsive Todo application built with **React** (frontend) and **Express** (backend). This app allows users to create, read, update, and delete todos with rich text editing capabilities. It is designed to work seamlessly on both desktop and mobile devices.

---

## Features

- **Create Todos**: Add new todos with a title and description.
- **Edit Todos**: Update existing todos with a rich text editor (bold, italic, underline, alignment, lists).
- **Delete Todos**: Remove todos permanently.
- **Responsive Design**: Optimized for both desktop and mobile views.
- **Real-Time Updates**: Changes are reflected immediately in the UI.
- **Rich Text Editing**: Supports basic text formatting for todo descriptions.

---

## Technologies Used

- **Frontend**:
  - React
  - React Router (for routing)
  - Axios (for API calls)
  - React Icons (for icons)
  - date-fns (for date formatting)
  - CSS (for styling)

- **Backend**:
  - Express.js
  - MongoDB (with Mongoose for database management)
  - CORS (for cross-origin requests)
  - dotenv (for environment variables)

---

## Installation

Follow these steps to set up the project locally:

### 1. Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git (optional)

### 2. Clone the Repository
```bash
git clone https://github.com/AdityaKumar2408/Bevysquare_assignment.git
cd Bevysquare_assignment
```

### 3. Set Up the Backend
Navigate to the backend directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the server directory and add your MongoDB connection URI:
```env
MONGO_URI=mongodb://localhost:27017/todo-app
PORT=5000
```

Start the backend server:
```bash
npm start
```

### 4. Set Up the Frontend
Navigate to the frontend directory:
```bash
cd ../client
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the client directory and add the backend API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

### 5. Access the App
Open your browser and navigate to:
```bash
http://localhost:5173
```

---

## Project Structure
```
Bevysquare_assignment/
├── client/                  # Frontend (React)
│   ├── public/              # Static assets
│   ├── src/                 # React components and logic
│   │   ├── components/      # Reusable components
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Entry point
│   ├── .env                 # Frontend environment variables
│   └── package.json         # Frontend dependencies
│
├── server/                  # Backend (Express)
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── .env                 # Backend environment variables
│   ├── server.js            # Backend entry point
│   └── package.json         # Backend dependencies
│
└── README.md                # Project documentation
```

---

## Usage

### Create a Todo:
- Click the "TODO" button in the sidebar to add a new todo.
- Enter a title and description in the editor.

### Edit a Todo:
- Select a todo from the sidebar.
- Use the toolbar to format the description (bold, italic, underline, alignment, lists).
- Changes are saved automatically.

### Delete a Todo:
- Select a todo and click the trash icon in the editor.

### Mobile View:
- On mobile devices, the sidebar is hidden when a todo is selected. Use the back button to return to the list.

---

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

- React for the frontend framework.
- Express for the backend framework.
- MongoDB for the database.
- React Icons for icons.
- date-fns for date formatting.
