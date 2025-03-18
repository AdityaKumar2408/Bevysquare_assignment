import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TodoEditor from './components/TodoEditor';
import MobileView from './components/MobileView';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSidebar, setShowSidebar] = useState(true);
  

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowSidebar(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
      if (response.data.length > 0 && !selectedTodo) {
        setSelectedTodo(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post(`${API_URL}/todos`);
      fetchTodos();
      setSelectedTodo(response.data);
      if (isMobile) {
        setShowSidebar(false); 
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, updatedData);
      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
      setSelectedTodo(response.data);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      if (selectedTodo && selectedTodo._id === id) {
        setSelectedTodo(todos.length > 1 ? todos.find(todo => todo._id !== id) : null);
      }
      fetchTodos();
      if (isMobile) {
        setShowSidebar(true); 
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleTodoSelect = (todo) => {
    setSelectedTodo(todo);
    if (isMobile) {
      setShowSidebar(false); 
    }
  };

  const handleBackButton = () => {
    setShowSidebar(true); 
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content-container">
        
          {isMobile ? (
            showSidebar ? (
              <Sidebar 
                todos={todos} 
                selectedTodo={selectedTodo} 
                setSelectedTodo={handleTodoSelect}
                addTodo={addTodo}
                isMobile={isMobile}
              />
            ) : (
              <MobileView
                selectedTodo={selectedTodo}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
                onBack={handleBackButton}
              />
            )
          ) : (
            
            <>
              <Sidebar 
                todos={todos} 
                selectedTodo={selectedTodo} 
                setSelectedTodo={setSelectedTodo}
                addTodo={addTodo}
                isMobile={isMobile}
              />
              <Routes>
                <Route path="/" element={
                  <TodoEditor 
                    selectedTodo={selectedTodo} 
                    updateTodo={updateTodo}
                    deleteTodo={deleteTodo}
                  />
                } />
              </Routes>
            </>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;