
module.exports = function(sequelize, Sequelize) {
    var VisaTypeSchema = sequelize.define('VisaType', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },{
        paranoid: true,
        timestamps: true,
    });
    return VisaTypeSchema;
}