module.exports = function(sequelize, Sequelize) {
    var PermissionSchema = sequelize.define('Permission', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        
        roleTag: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        permission: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },{
        paranoid: false,
        timestamps: true,
    });
    return PermissionSchema;
}