module.exports = function (sequelize, Sequelize) {
    var SalaryRangeSchema = sequelize.define('SalaryRange', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        hValue: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        yValue: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        paranoid: false,
        timestamps: true,
    });
    return SalaryRangeSchema;
}