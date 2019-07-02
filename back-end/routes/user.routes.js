import express from 'express';
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/register', UserController.create);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.put('/update', UserController.update);

module.exports = router;
