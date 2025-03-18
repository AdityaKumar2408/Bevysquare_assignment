import React, { useState, useEffect, useRef } from 'react';
import { 
  FaTrash, FaBold, FaItalic, FaUnderline, 
  FaListUl, FaListOl, FaAlignLeft, 
  FaAlignCenter, FaAlignRight 
} from 'react-icons/fa';

function TodoEditor({ selectedTodo, updateTodo, deleteTodo, isMobile }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const contentEditableRef = useRef(null);
  
  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      if (contentEditableRef.current) {
        contentEditableRef.current.innerHTML = selectedTodo.description || '';
      }
      setDescription(selectedTodo.description);
    }
  }, [selectedTodo]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = () => {
    if (contentEditableRef.current) {
      setDescription(contentEditableRef.current.innerHTML);
    }
  };

  const handleBlur = () => {
    if (selectedTodo && (title !== selectedTodo.title || description !== selectedTodo.description)) {
      updateTodo(selectedTodo._id, { title, description });
    }
  };
  const formatText = (command, value = null) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    document.execCommand(command, false, value);
    
    contentEditableRef.current.focus();
    
    try {
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (e) {
      console.log("Could not restore selection");
    }
    
    handleDescriptionChange();
  };

  if (!selectedTodo) {
    return <div className="editor-empty">No todo selected</div>;
  }

  return (
    <div className="todo-editor">
      <div className="editor-header">
        <input
          type="text"
          className="title-input"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleBlur}
          placeholder="Title"
        />
        <button className="delete-btn" onClick={() => deleteTodo(selectedTodo._id)}>
          <FaTrash />
        </button>
      </div>

      <div className="editor-toolbar">
        <button className="toolbar-btn" type="button" onMouseDown={(e) => { e.preventDefault(); formatText('bold'); }}>
          <FaBold />
        </button>
        <button className="toolbar-btn" type="button" onMouseDown={(e) => { e.preventDefault(); formatText('italic'); }}>
          <FaItalic />
        </button>
        <button className="toolbar-btn" type="button" onMouseDown={(e) => { e.preventDefault(); formatText('underline'); }}>
          <FaUnderline />
        </button>
        <span className="toolbar-divider"></span>
        <button className="toolbar-btn" type="button" onMouseDown={(e) => { e.preventDefault(); formatText('justifyLeft'); }}>
          <FaAlignLeft />
        </button>
        <button className="toolbar-btn" type="button" onMouseDown={(e) => { e.preventDefault(); formatText('justifyCenter'); }}>
          <FaAlignCenter />
        </button>
        <button className="toolbar-btn" type="button" onMouseDown={(e) => { e.preventDefault(); formatText('justifyRight'); }}>
          <FaAlignRight />
        </button>
        <span className="toolbar-divider"></span>
        <button className="toolbar-btn" type="button" onMouseDown={(e) => { e.preventDefault(); formatText('insertUnorderedList'); }}>
          <FaListUl />
        </button>
        <button className="toolbar-btn" type="button" onMouseDown={(e) => { e.preventDefault(); formatText('insertOrderedList'); }}>
          <FaListOl />
        </button>
      </div>

      <div className="editor-content">
        <div
          ref={contentEditableRef}
          className="content-editable"
          contentEditable
          onInput={handleDescriptionChange}
          onBlur={handleBlur}
        ></div>
      </div>
    </div>
  );
}

export default TodoEditor;