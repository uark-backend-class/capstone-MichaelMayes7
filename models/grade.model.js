module.exports = (sequelize, Sequelize) => {
    return sequelize.define('grade', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      percentage: Sequelize.STRING,
      letter_grade: Sequelize.STRING,
    }, { freezeTableName: true });
  }