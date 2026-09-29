const mongoose = require('mongoose');
const User = require('../models/userModel');

// 1. GET /users (Get all users, supports filtering)
const getAllUsers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.role) filter.role = req.query.role;
    if (req.query.age) filter.age = Number(req.query.age);

    const users = await User.find(filter);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 2. GET /users/:id (Negative Test 1 & 2 handled here)
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // NEGATIVE TEST 1: Check if the ID is a valid 24-character hexadecimal
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid User ID format' });
    }

    const user = await User.findById(id);

    // NEGATIVE TEST 2: Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 3. POST /users (Negative Test 3 handled here)
const createUser = async (req, res) => {
  try {
    const { name, email, age, role } = req.body;

    // NEGATIVE TEST 3: Check for missing fields
    if (!name || !email || !age || !role) {
      return res.status(400).json({ 
        message: 'All fields (name, email, age, role) are required' 
      });
    }

    const newUser = await User.create({ name, email, age, role });
    return res.status(201).json(newUser);
  } catch (error) {
    // Check duplicate email violation
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    return res.status(500).json({ message: error.message });
  }
};

// 4. PUT /users/:id (Full Update)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid User ID format' });
    }

    const { name, email, age, role } = req.body;
    if (!name || !email || !age || !role) {
      return res.status(400).json({ 
        message: 'PUT requires all fields: name, email, age, role' 
      });
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
    return res.status(500).json({ message: error.message });
  }
};

// 5. PATCH /users/:id (Partial Update)
const patchUser = async (req, res) => {
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
    return res.status(500).json({ message: error.message });
  }
};

// 6. DELETE /users/:id
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid User ID format' });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ 
      message: 'User deleted successfully', 
      user: deletedUser 
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  deleteUser
};