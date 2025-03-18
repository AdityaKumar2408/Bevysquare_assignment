const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/todo-app')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

  const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'New Additions'
  },
  description: {
    type: String,
    required: true,
    default: 'To stay representative of framework & new example apps.'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title || 'New Additions',
      description: req.body.description || 'To stay representative of framework & new example apps.'
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/todos/:id', async (req, res) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        { 
          title: req.body.title, 
          description: req.body.description 
        },
        { new: true }
      );
      
      if (!updatedTodo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      
      res.json(updatedTodo);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));