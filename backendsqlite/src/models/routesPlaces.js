const Sequelize = require('sequelize')
const db = require('./database.js')
const routes = require('./routes.js')
const places = require('./places.js')
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

// Many-to-many association between Routes and Places
places.belongsToMany(routes, { through: routesPlaces })
routes.belongsToMany(places, { through: routesPlaces })

module.exports = routesPlaces
