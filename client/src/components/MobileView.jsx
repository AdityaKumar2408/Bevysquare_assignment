import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import TodoEditor from './TodoEditor';

function MobileView({ selectedTodo, updateTodo, deleteTodo, onBack }) {
  return (
    <div className="mobile-view">
      <div className="mobile-header">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft /> Back
        </button>
      </div>
      <TodoEditor 
        selectedTodo={selectedTodo} 
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
        isMobile={true}
      />
    </div>
  );
}

export default MobileView;