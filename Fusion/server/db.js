const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
  logging: false,
});

const User = sequelize.define('User', {
  googleId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  picture: {
    type: DataTypes.STRING,
  },
});

const History = sequelize.define('History', {
  prompt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  chatGPTResponse: {
    type: DataTypes.TEXT,
  },
  claudeResponse: {
    type: DataTypes.TEXT,
  },
  geminiResponse: {
    type: DataTypes.TEXT,
  },
  similarities: {
    type: DataTypes.TEXT,
  },
});

User.hasMany(History);
History.belongsTo(User);

module.exports = { sequelize, User, History };
