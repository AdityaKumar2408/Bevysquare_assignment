import React from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { format } from 'date-fns';

function Sidebar({ todos, selectedTodo, setSelectedTodo, addTodo }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="add-todo-btn" onClick={addTodo}>
          <span className="todo-icon">📝</span> TODO
        </button>
        <div className="search-container">
          <FaSearch className="search-icon" />
        </div>
      </div>
      
      <div className="todo-list">
        {todos.map(todo => (
          <div 
            key={todo._id} 
            className={`todo-item ${selectedTodo && selectedTodo._id === todo._id ? 'selected' : ''}`}
            onClick={() => setSelectedTodo(todo)}
          >
            <div className="todo-content">
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
            </div>
            <div className="todo-date">
              {format(new Date(todo.createdAt), 'MMM d, yyyy')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
