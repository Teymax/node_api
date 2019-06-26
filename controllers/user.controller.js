const { throwError, to, error, success } = require('../utils/requestHelpers');
const authService = require('../services/auth.service');
// import { user as User } from '../models';

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

const login = async (req, res) => {
  const { body } = req;
  let err, user;
  [err, user] = await to(authService.login(body));
  if (err) throwError(err.message);
  success(res, user);
};

// const login = async (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   const { body } = req;
//   const email = body.email;
//   const password = body.password;
//   if(email && password){
//     await User.findOne({ where: {email: email} }).then(user =>{
//       if(user.comparePassword(password)){
//         let access_token = jwt.sign({user_id: user.id}, JWT_ENCRYPTION, {expiresIn: 3600})
//             .catch(err => throwError(err.message, true));
//         let refresh_token = jwt.sign({user_id: user.id, user_email: user.email}, JWT_ENCRYPTION, { expiresIn: JWT_EXPIRATION})
//             .catch(err => throwError(err.message, true));
//         user.refresh_token = refresh_token;
//         user.save();
//         return success(res, {
//           user: user,
//           access_token: access_token,
//           refresh_token: refresh_token
//         }, 200);
//       }
//     })
//   }
// };

exports.create = create;
exports.login = login;