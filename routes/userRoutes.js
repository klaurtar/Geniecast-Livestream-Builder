const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

//router.route('/').post(userController.createNewUser);
router.route('/:id').post(userController.createNewUser);

module.exports = router;
