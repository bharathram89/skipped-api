module.exports = function (sequelize, Sequelize) {
  var StatusCodeSchema = sequelize.define(
    "StatusCode",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: false,
      timestamps: true,
    }
  );
  return StatusCodeSchema;
};
