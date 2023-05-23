const placesModel = require('../models/places.js')
const routeModel = require('../models/routes.js')
const routesPlacesModel = require('../models/routesPlaces.js')
const routeUserVoteModel = require('../models/routesUsersVote.js')
const userModel = require('../models/users.js')

const bcrypt = require('bcrypt');
// Ajouter ici les nouveaux require des nouveaux modèles

// eslint-disable-next-line no-unexpected-multiline
(async () => {
  // Regénère la base de données
  await require('../models/database.js').sync({ force: true })
  console.log('Base de données créée.')
  // Initialise la base avec quelques données
  // const passhashLouis = await bcrypt.hash('louis', 2)
  // const passhashFei = await bcrypt.hash('fei', 2)

  // await userModel.create({
  //   username: 'louisJ',
  //   email: 'louisjeudy1@gmail.com',
  //   password: passhashLouis,
  //   isadmin: false
  // })
  // await userModel.create({
  //   username: 'fei',
  //   email: 'fei@gmail.com',
  //   password: passhashFei,
  //   isadmin: true
  // })
  // Ajouter ici le code permettant d'initialiser par défaut la base de donnée
  // await routeModel.create(
  //   {
  //     title: 'Au bord de la plage',
  //     coordinates: {
  //       data: {
  //         latitude: [20.123],
  //         longitude: [12.456]
  //       }
  //     },
  //     estimatedDistance: 10000,
  //     estimatedTime: 1800,
  //     activityType: 'run',
  //     userId: 2,
  //     isPrivate: false
  //   }
  // )
  // await routeUserModel.create(
  //   {
  //     routeId: 1,
  //     userId: 2,
  //     note: 5
  //   }
  // )
})()
