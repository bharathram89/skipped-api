module.exports = function(sequelize, Sequelize) {
    var MatchScoreSchema = sequelize.define('MatchScore', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        profileId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        education: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        primarySkill: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        secondarySkill: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        industry: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        visaType: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        experiance: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        salary: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        jobTitle: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        remoteWork: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        location: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },{
        paranoid: false,
        timestamps: true,
    });
    return MatchScoreSchema;
}