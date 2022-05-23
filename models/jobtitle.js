module.exports = function (sequelize, Sequelize) {
  var JobTitleSchema = sequelize.define(
    "JobTitle",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      parentId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
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
  return JobTitleSchema;
};
