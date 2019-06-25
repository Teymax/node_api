const { to, error, success } = require('../utils/requestHelpers');
const authService = require('../services/auth.service');

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
    [err, user] = await to(authService.register(body));
    if (err) return error(res, err, 422);
    return success(res, {message:'Successfully created new user.', user: user}, 201);
  }
};

exports.create = create;
