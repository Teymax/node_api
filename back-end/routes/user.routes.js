import express from 'express';
const router = express.Router();
const UserController = require('../controllers/user.controller');
const passport = require('passport');
require('../middleware/passport')(passport);
const mkdirp = require('mkdirp');
const multer = require('multer');

// move this code to the middleware folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        mkdirp('./media/user_photos/'+req.body.email+'/');
        cb(null, './media/user_photos/'+req.body.email+'/');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.email + '-' + file.originalname);
    }
});
const upload = multer({storage: storage});


router.post('/register', UserController.create);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/info', passport.authenticate('jwt', {session:false}), upload.single('user_image'), UserController.user_info);
router.put('/update', passport.authenticate('jwt', {session:false}), upload.single('user_image'), UserController.update);

module.exports = router;
