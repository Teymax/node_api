module.exports = (sequelize, DataTypes) => {
    let History = sequelize.define('history', {
        history_date: DataTypes.DATE,
    });
    History.associate = function (models) {
        History.belongsTo(models.vehicles,{
            foreignKey: 'vehicle_id',
            onDelete: 'CASCADE'
        })
    };
    return History;
};
