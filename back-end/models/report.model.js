module.exports = (sequelize, DataTypes) => {
    let Vehicle_Report = sequelize.define('vehicle_report', {
        type: DataTypes.INTEGER(1),
        note: DataTypes.TEXT,
    },{
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });
    Vehicle_Report.associate = function (models) {
        Vehicle_Report.belongsTo(models.vehicle_info,{
            as: 'vehicle_id',
            onDelete: 'CASCADE'
        })
    };

/*    Vehicle_Report.associate = function (models) {
        Vehicle_Report.belongsTo(models.vehicle_history, {
            as: 'vehicle_report_id',
            onDelete: 'CASCADE'
        })
    };*/
    Vehicle_Report.associate = function (models) {
        Vehicle_Report.hasOne(models.vehicle_history, {
            foreignKey: 'vehicle_report_id',
            onDelete: 'CASCADE'
        })
    };
    Vehicle_Report.associate = function (models) {
        Vehicle_Report.belongsTo(models.user,{
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        })
    };
    return Vehicle_Report;
};
