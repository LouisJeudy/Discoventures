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
  const passhashLouis = await bcrypt.hash('louis', 2)
  const passhashFei = await bcrypt.hash('fei', 2)

  await userModel.create({
    username: 'louisJ',
    email: 'louisjeudy1@gmail.com',
    password: passhashLouis,
    isadmin: false
  })
  await userModel.create({
    username: 'fei',
    email: 'fei@gmail.com',
    password: passhashFei,
    isadmin: true
  })
  // // Ajouter ici le code permettant d'initialiser par défaut la base de donnée
  await routeModel.create({
    title: 'Seaside',
    coordinates: {
      data: {
        latitude: [20.123456],
        longitude: [11.12345]
      }
    },
    estimatedDistance: 10000,
    estimatedTime: 1800,
    activityType: 'run',
    userId: 2,
    isPrivate: false
  })
  await routeModel.create({
    title: 'Walk in the hoods',
    coordinates: {
      data: {
        latitude: [20.123456, 1.2156, 4.2156],
        longitude: [11.12345, 6.1267, 617.172]
      }
    },
    estimatedDistance: 10000,
    estimatedTime: 1800,
    activityType: 'run',
    userId: 1,
    isPrivate: false
  })
  const route3 = await routeModel.create(
    {
      title: 'Au bord de la plage',
      coordinates: {
        data: {
          latitude: [20.123],
          longitude: [12.456]
        }
      },
      estimatedDistance: 10000,
      estimatedTime: 1800,
      activityType: 'run',
      userId: 2,
      isPrivate: true
    }
  )
  await routeUserVoteModel.create(
    {
      routeId: 1,
      userId: 2,
      note: 5
    }
  )
  const place1 = await placesModel.create({
    title: 'BarOFish',
    description: 'Un endroit convivial pour manger des spécialités de la mer avec une magnifique vue.',
    latitude: 12.388,
    longitude: 23.378873
  })
  route3.addPlace(place1)
})()
