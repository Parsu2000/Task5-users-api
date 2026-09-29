const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  deleteUser
} = require('../controllers/userController');

// Routes for /users
router.get('/', getAllUsers);
router.post('/', createUser);

// Routes for /users/:id
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.patch('/:id', patchUser);
router.delete('/:id', deleteUser);

module.exports = router;