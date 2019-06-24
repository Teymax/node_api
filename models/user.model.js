module.exports = (sequelize, DataTypes) => {
  let Model = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  })
  return Model;
};
