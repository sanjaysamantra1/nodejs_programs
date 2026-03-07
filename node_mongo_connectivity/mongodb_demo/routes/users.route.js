var express = require('express');
var router = express.Router();
const { fetchUsers, fetchUserById
    , createUser, updateUser, deleteUser } = require('../controllers/user.controllers');

// User Routes
router.get('/', fetchUsers);
router.get('/:id', fetchUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
