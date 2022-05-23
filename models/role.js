module.exports = function(sequelize, Sequelize) {
    var RoleSchema = sequelize.define('Role', {
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
            allowNull: false,
        },
        tag: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },{
        paranoid: false,
        timestamps: true,
    });
    return RoleSchema;
}