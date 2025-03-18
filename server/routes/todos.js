const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const skip = (page - 1) * limit;
    
    const query = { user: req.userId };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const totalCount = await Todo.countDocuments(query);
    
    const todos = await Todo.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    res.json({
      todos,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title || 'New Additions',
      description: req.body.description || 'To stay representative of framework & new example apps.',
      user: req.userId
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.put('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    if (todo.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { 
        title: req.body.title, 
        description: req.body.description 
      },
      { new: true }
    );
    
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    if (todo.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
