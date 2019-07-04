import {user as User} from "../models";

const { throwError, to, error, success } = require('../utils/requestHelpers');
const authService = require('../services/auth.service');
const { user } = require('../models');

const create = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const { body } = req;
  if (!body.username || !body.email) {
    return error(res, 'Please enter an email and username to register', 400);
  } else if (!body.password) {
    return error(res, 'Please enter an password to register', 400);
  } else {
    let err, user;
    // place for auth service request
    [err] = await to(authService.register(body));
    if (err) return error(res, err.message, 400);
    [err, user] = await to(authService.login(body));
    if (err) return error(res, err.message, 400);
    return success(res, {message:'Successfully created new user.', user: user}, 201);
  }
};

const login = async (req, res) => {
  const { body } = req;
  let err, user;
  [err, user] = await to(authService.login(body));
  if (err) return  error(res, err.message, 400);
  return success(res, user);
};


const logout = async (req, res) => {
  req.logout();
  return success(res, {message: 'Successfull logout.'}, 200);
};

const user_info = async (req, res) => {
  let err, user;
  if (!req.body.email) return error(res, "no user found!", 400);
  [err, user] = await to(User.findOne({where: {email: req.body.email} }));
  if (err) return error(res, err.message, 400);
  return success(res, {user: user});
};

const update = async (req, res) => {
  let err, user;
  if (!req.body.email) return error(res, "no user found!", 400);
  [err, user] = await to(User.findOne({where: {email: req.body.email} }));
  if (err) return error(res, err.message, 400);
  if (req.file) {
    let user_image = req.file.destination + req.file.filename;
    [err, user] = await to(user.update({ user_image: `${user_image}`} ));
    if(err) return error(res, err.message, 400);
  }
  if (req.body.username){
      [err, user] = await to(user.update({username: req.body.username}));
      if(err) return error(res, err.message, 400);
  }
  if (req.body.new_password && !req.body.old_password) return error(res, "Enter old password to change it", 400);
  if (req.body.new_password && req.body.old_password)
  {
    [err, user] = await to(user.comparePassword(req.body.old_password));
    if (err) return error(res, err.message, 400);
    [err, user] = await to(user.update({password: req.body.new_password}));
    if (err) return error(res, err.message, 400);
  }
  return success(res, {user: user});
};

exports.create = create;
exports.login = login;
exports.logout = logout;
exports.update = update;
exports.user_info = user_info;
