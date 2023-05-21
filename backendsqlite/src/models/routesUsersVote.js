const Sequelize = require('sequelize')
const db = require('./database.js')
const routes = require('../models/routes.js')
const users = require('../models/users.js')
const routesUsers = db.define('routesUsers', {
  routeId: {
    primaryKey: false,
    type: Sequelize.INTEGER,
    references: {
      model: routes,
      key: 'id'
    }
  },
  userId: {
    primaryKey: false,
    type: Sequelize.INTEGER,
    references: {
      model: users,
      key: 'id'
    }
  },
  // Note of the route by the user
  note: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      max: {
        args: [5],
        msg: 'Note must be a value between 0 and 5'
      },
      min: {
        args: [0],
        msg: 'Note must be a value between 0 and 5'
      }
    }
  }
}, { timestamps: false })

users.belongsToMany(routes, { through: routesUsers })
routes.belongsToMany(users, { through: routesUsers })

module.exports = routesUsers
