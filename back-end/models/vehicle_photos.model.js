module.exports = (sequelize, DataTypes) => {
    let Model = sequelize.define('vehicle_photos', {
        thumbnail: DataTypes.STRING,
        cam1_hd: DataTypes.STRING,
        cam2_hd: DataTypes.STRING,
        cam3_hd: DataTypes.STRING,
        cam4_hd: DataTypes.STRING,
        cam1_4k: DataTypes.STRING,
        cam2_4k: DataTypes.STRING,
        cam3_4k: DataTypes.STRING,
        cam4_4k: DataTypes.STRING
    },{
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });
    Model.associate = function (models) {
        Model.belongsTo(models.vehicle_info,{
            foreignKey: 'vehicle_id',
            onDelete: 'CASCADE'
        })
    };
    Model.associate = function (models) {
        Model.belongsTo(models.vehicle_history,{
            foreignKey: 'vehicle_history_id',
            onDelete: 'CASCADE'
        })
    };
    return Model;
};
