module.exports = (sequelize, Sequelize) => {
    return sequelize.define('assignment', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,

      },
      userId: {
          type: Sequelize.INTEGER,
          foreignKey: true,
          allowNull: false,

      },
      description: Sequelize.STRING,
      due_date: Sequelize.STRING,
    }, { freezeTableName: true });
  }