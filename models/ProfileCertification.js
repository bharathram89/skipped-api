module.exports = function(sequelize, Sequelize) {
    var ProfileCertificationSchema = sequelize.define('ProfileCertification', {
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
        certificationId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        validUpto: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    },{
        paranoid: false,
        timestamps: true,
    });
    return ProfileCertificationSchema;
}