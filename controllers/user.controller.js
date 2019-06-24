const { to, ReE, ReS } = require('../utils/requestHelpers');
const authService = require('../services/auth.service');

const create = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const { body } = req;
  if (!body.username && !body.email) {
    return ReE(res, 'Please enter an email and username to register');
  } else if (!body.password) {
    return ReE(res, 'Please enter an password to register');
  } else {
    let err, user;
    // place for auth service request
    [err, user] = await to(authService.register(body));
    if (err) return ReE(res, err, 422);
    return ReS(res, {message:'Successfully created new user.', user: user}, 201);
  }
};

exports.create = create;
