const Sequelize = require('sequelize')
const db = require('./database.js')
const users = db.define('users', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING(16),
    unique: true,
    allowNul: false
  },
  email: {
    type: Sequelize.STRING(128),
    unique: true,
    allowNul: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING(60),
    allowNul: false,
    validate: {
      is: /^[0-9a-z\\/$.]{60}$/i
    }
  },
  isadmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  spotifyToken: {
    type: Sequelize.STRING(60),
    allowNul: true,
    unique: true
  }
}, { timestamps: false })
module.exports = users
