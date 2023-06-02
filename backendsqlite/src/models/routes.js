const Sequelize = require('sequelize')
const db = require('./database.js')
const users = require('./users.js')
const routes = db.define('routes', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  },
  // Title of the route
  title: {
    type: Sequelize.STRING(60),
    allowNull: false
  },
  // Contains a JSON with a key "data" that contains a JSON with 2 keys : "latitude" and "longitude", two arrays
  coordinates: {
    type: Sequelize.JSON,
    allowNull: false
  },
  // Estimated distance to complete the route (in meters)
  estimatedDistance: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  // Estimated time to complete the route (in seconds)
  estimatedTime: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  // Whether the route is visible by all users or only by the author
  isPrivate: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  // Average score given by users (/5)
  score: {
    type: Sequelize.FLOAT,
    defaultValue: 0.0
  },
  // Number of voters who gave a score
  nbVoters: {
    type: Sequelize.INTEGER,
    defaultValue: 0.0
  },
  activityType: {
    type: Sequelize.ENUM,
    values: ['walk', 'run', 'bike'],
    allowNull: false,
    validate: {
      isIn: {
        args: [['walk', 'run', 'bike']],
        msg: 'Activity type must be \'walk\', \'run\' or \'bike\''
      }
    }
  }
}, { timestamps: false })
// One-to-many association between Routes and Users
users.hasMany(routes, {
  foreignKey: 'userId'
})
routes.belongsTo(users)
// routes.associate = function (models) {
//   routes.belongsToMany(models.places, { through: 'routesPlaces' })
// }
// Many-to-many association between Routes and Places
// TODO: remove comments below when places API is done
// routes.hasMany(places)
// places.hasMany(routes)
module.exports = routes
