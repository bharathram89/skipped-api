module.exports = function(sequelize, Sequelize) {
    var UserSkillsSchema = sequelize.define('UserSkills', {
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
        skillId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        skillLevel: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },{
        paranoid: false,
        timestamps: true,
    });
    return UserSkillsSchema;
}