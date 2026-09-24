const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/userModel');

// 1. GET /users (Supports ?role=...&age=...)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.role) filter.role = req.query.role;
    if (req.query.age) filter.age = Number(req.query.age);

    const users = await User.find(filter);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// 2. GET /users/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid User ID format' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// 3. POST /users
router.post('/', async (req, res) => {
  try {
    const { name, email, age, role } = req.body;
    if (!name || !email || !age || !role) {
      return res.status(400).json({ message: 'All fields (name, email, age, role) are required' });
    }

    const newUser = await User.create({ name, email, age, role });
    return res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// 4. PUT /users/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid User ID format' });
    }

    const { name, email, age, role } = req.body;
    if (!name || !email || !age || !role) {
      return res.status(400).json({ message: 'PUT requires all fields: name, email, age, role' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, age, role },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// 5. PATCH /users/:id
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid User ID format' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// 6. DELETE /users/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid User ID format' });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;