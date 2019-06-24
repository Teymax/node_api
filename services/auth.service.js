const { user } = require('../models');
const { to, TE } = require('../utils/requestHelpers');

const register = async userInfo => {
  let err, newUser;
  [err, newUser] = await to(user.create(userInfo));
  if(err) TE('user already exists with that email');
  return newUser;
};

module.exports.register = register;
