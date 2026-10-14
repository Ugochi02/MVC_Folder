const express = require('express');
const router = express.Router();

const { allUsers, newUser, oneUser, updateUser, removeUser } = require('../controller/user.js');

router.get('/allUsers', allUsers);
router.post('/newUser', newUser);
router.get('/oneUser/:id', oneUser);
router.patch('/updateUser/:id', updateUser);
router.delete('/removeUser/:id', removeUser);

module.exports = router