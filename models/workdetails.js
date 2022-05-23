
module.exports = function(sequelize, Sequelize) {
    var WorkDetailsSchema = sequelize.define('WorkDetails', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        profileId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        companyId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        startDate: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        endDate: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        presentCompany: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        designation: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        rolesResponsibility: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },{
        paranoid: false,
        timestamps: true,
    });
    return WorkDetailsSchema;
}