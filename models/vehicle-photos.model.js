module.exports = (sequelize, DataTypes) => {
    let Model = sequelize.define('vehicle_photos', {
        vehicle_id: DataTypes.STRING,
        first_4K: DataTypes.STRING,
        first_500px: DataTypes.STRING,
        first_64px: DataTypes.STRING,
        second_4K: DataTypes.STRING,
        second_500px: DataTypes.STRING,
        second_64px: DataTypes.STRING,
    });
    return Model;
};
