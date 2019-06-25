const { user } = require('../models');
const { to, throwError } = require('../utils/requestHelpers');

const register = async userInfo => {
  let err, newUser;
  [err, newUser] = await to(user.create(userInfo));
  if(err) throwError(err.message);
  return newUser;
};

module.exports.register = register;
