module.exports = (sequelize, Sequelize) => {
    return sequelize.define('student', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
    }, { freezeTableName: true });
  }