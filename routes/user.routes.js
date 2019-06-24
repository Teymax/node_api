import express from 'express';
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/register', UserController.create);

module.exports = router;
