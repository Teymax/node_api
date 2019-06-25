const { to, error, success } = require('../utils/requestHelpers');
const authService = require('../services/auth.service');
const jwt = require('jsonwebtoken');
const { user } = require('../models');
const secret = process.env.JWT_ENCRYPTION;
const expiration = process.env.JWT_EXPIRATION;

const create = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const { body } = req;
  if (!body.username && !body.email) {
    return error(res, 'Please enter an email and username to register');
  } else if (!body.password) {
    return error(res, 'Please enter an password to register');
  } else {
    let err, user;
    // place for auth service request
    [err, user] = await to(authService.register(body));
    if (err) return error(res, err, 422);
    return success(res, {message:'Successfully created new user.', user: user}, 201);
  }
};

const login = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const { body } = req;
  const email = body.email;
  const password = body.password;
  if(email && password){
    user.findOne({ where: {email: email} }).then((user)=>{
      if(user.comparePassword(password)){
        let access_token = jwt.sign({user_id: user.id}, secret, {expiresIn: 3600});
        let refresh_token = jwt.sign({user_id: user.id, user_email: user.email}, secret, { expiresIn: expiration});
        user.refresh_token = refresh_token;
        user.save();
        return success(res, {
          user: user,
          access_token: access_token,
          refresh_token: refresh_token
        }, 200);

      }


    })
  }
};

exports.create = create;
exports.login = login;
