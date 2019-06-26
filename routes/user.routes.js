import express from 'express';
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/register', UserController.create);
router.post('/login', UserController.login);

module.exports = router;
