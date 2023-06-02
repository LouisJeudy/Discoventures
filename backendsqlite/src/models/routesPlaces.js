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
places.belongsToMany(routes, { through: routesPlaces, as: 'routes' })
// places.associate = function (models) {
//   places.belongsToMany(models.routes, { through: models.routesPlaces })
// }
// routes.associate = function (models) {
//   routes.belongsToMany(models.places, { through: models.routesPlaces })
// }
routes.belongsToMany(places, { through: routesPlaces, as: 'places' })
module.exports = routesPlaces
