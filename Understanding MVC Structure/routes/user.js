const express = require('express');
const router = express.Router();
const {getUsers,createUser,editUser, deleteUser} = require('../controllers/user')

router.route('/').get(getUsers).post(createUser);
router.route('/:id').patch(editUser).delete(deleteUser)

module.exports = router;