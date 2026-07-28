const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Use hosted Postgres in production (persists across deploys/cold starts),
// fall back to a local SQLite file for development.
const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: process.env.VERCEL ? '/tmp/database.sqlite' : path.join(__dirname, 'database.sqlite'),
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
