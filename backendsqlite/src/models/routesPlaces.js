const Sequelize = require('sequelize')
const db = require('./database.js')
const routes = require('../models/routes.js')
const places = require('../models/places.js')
const routesPlaces = db.define('routesPlaces', {
  routeId: {
    type: Sequelize.INTEGER,
    references: {
      model: routes,
      key: 'id'
    }
  },
  placeId: {
    type: Sequelize.INTEGER,
    references: {
      model: places,
      key: 'id'
    }
  }
}, { timestamps: false })
routes.belongsToMany(places, { through: routesPlaces })
places.belongsToMany(routes, { through: routesPlaces })
module.exports = routesPlaces
