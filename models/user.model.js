module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: Sequelize.STRING,
    }, { freezeTableName: true });
  }


  