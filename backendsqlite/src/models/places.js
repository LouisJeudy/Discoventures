const Sequelize = require('sequelize')
const db = require('./database.js')
const places = db.define('places', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  // Title of the place
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // Description of the place
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // Latitude of the place
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  // Longitude of the place
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
}, { timestamps: false })

module.exports = places
