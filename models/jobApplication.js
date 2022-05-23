module.exports = function(sequelize, Sequelize) {
    var JobApplicationSchema = sequelize.define('JobApplication', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        appliedBy: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        jobId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        jobCreatedBy: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastUpdatedBy: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        applicantMessage: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        reviewerMessage: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },{
        paranoid: true,
        timestamps: true,
    });
    return JobApplicationSchema;
}