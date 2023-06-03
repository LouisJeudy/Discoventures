/* eslint-disable no-unused-vars */
const app = require('../app')
const request = require('supertest')
const placesModel = require('../models/places.js')
const routeModel = require('../models/routes.js')
const routesPlacesModel = require('../models/routesPlaces.js')
const routeUserVoteModel = require('../models/routesUsersVote.js')
const userModel = require('../models/users.js')

let ADMIN_JWT = null
let LAMBDA_JWT = null

beforeAll(async () => {
  const jws = require('jws')
  const { TOKENSECRET } = process.env
  const bcrypt = require('bcrypt')
  await require('../models/database.js').sync({ force: true })
  // Initialise la base avec quelques données
  const passwordHashed = await bcrypt.hash('!A1o2e3r4', 2)
  const adminUser = await userModel.create({
    username: 'Admin',
    email: 'admin@email.com',
    password: passwordHashed,
    isadmin: true
  })
  ADMIN_JWT = jws.sign({
    header: { alg: 'HS256' },
    payload: { id: adminUser.id, isadmin: true },
    secret: TOKENSECRET
  })
  const lambdaUser = await userModel.create({
    username: 'Lambda',
    email: 'lambda@email.com',
    password: passwordHashed,
    isadmin: false
  })
  LAMBDA_JWT = jws.sign({
    header: { alg: 'HS256' },
    payload: { id: lambdaUser.id, isadmin: false },
    secret: TOKENSECRET
  })
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
    userId: 1,
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
  const routeSeaside2 = await routeModel.create({
    title: 'Seaside2',
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
    isPrivate: true
  })
  const place = await placesModel.create({
    title: 'BarOFish',
    description: 'Un endroit convivial pour manger des spécialités de la mer avec une magnifique vue.',
    latitude: 12.388,
    longitude: 23.378873
  })
  routeSeaside2.addPlace(place)
})

describe('GET /routes', () => {
  test('Test if we can fetch all public routes with a token', async () => {
    const response = await request(app)
      .get('/routes')
      .set('x-access-token', ADMIN_JWT)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Tous les parcours publics')
    expect(response.body.data.length).toBe(2)
    expect(response.body.data).toStrictEqual(
      [{
        id: 1,
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
        userId: 1,
        score: 0.0,
        nbVoters: 0.0
      }, {
        id: 2,
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
        score: 0.0,
        nbVoters: 0.0,
        userId: 1
      }])
  })
  test('Test that we cannot fetch all public users without a token', async () => {
    const response = await request(app)
      .get('/routes')
    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe('Token manquant')
  })
})

describe('GET /routes/users/:id', () => {
  test('Test if we get all routes of the user', async () => {
    const responseGet = await request(app)
      .get('/routes/users/2')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('x-access-token', LAMBDA_JWT)
    expect(responseGet.body.message).toBe("Tous les parcours de l'utilisateur")
    expect(responseGet.statusCode).toBe(200)
    expect(responseGet.body.data).toStrictEqual(
      [{
        id: 3,
        title: 'Seaside2',
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
        score: 0.0,
        nbVoters: 0.0,
        isPrivate: true
      }]
    )
  })
  test('Test if we get all routes of the user as an admin', async () => {
    const responseGet = await request(app)
      .get('/routes/users/2')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('x-access-token', ADMIN_JWT)
    expect(responseGet.statusCode).toBe(200)
    expect(responseGet.body.message).toBe("Tous les parcours de l'utilisateur")
    expect(responseGet.body.data).toStrictEqual(
      [{
        id: 3,
        title: 'Seaside2',
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
        score: 0.0,
        nbVoters: 0.0,
        isPrivate: true
      }]
    )
  })
  test('Test that we cannot all routes of another user as a lambda user', async () => {
    const responseGet = await request(app)
      .get('/routes/users/1')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('x-access-token', LAMBDA_JWT)
    expect(responseGet.statusCode).toBe(403)
    expect(responseGet.body.message).toBe('Vous n\'avez pas le droit d\'effectuer cette action')
  })

  test('Test if we cannot get all routes of the user without the token', async () => {
    const responseGet = await request(app)
      .get('/routes/users/4')
      .set('Content-type', 'application/x-www-form-urlencoded')
    expect(responseGet.statusCode).toBe(401)
    expect(responseGet.body.message).toBe(
      'Token manquant'
    )
  })
})

describe('GET /routes/:id', () => {
  test('Test that we can get all informations of a specific route', async () => {
    const responseGet = await request(app)
      .get('/routes/1')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('x-access-token', LAMBDA_JWT)
    // expect(responseGet.statusCode).toBe(200)
    expect(responseGet.body.message).toBe('Parcours récupéré')
    expect(responseGet.body.data).toStrictEqual(
      {
        id: 1,
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
        userId: 1,
        score: 0.0,
        places: [],
        nbVoters: 0.0,
        isPrivate: false
      }
    )
  })
  describe('GET /routes/:id', () => {
    test('Test that we can get all informations of a specific route with places', async () => {
      const responseGet = await request(app)
        .get('/routes/3')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .set('x-access-token', LAMBDA_JWT)
      expect(responseGet.statusCode).toBe(200)
      expect(responseGet.body.message).toBe('Parcours récupéré')
      expect(responseGet.body.data).toStrictEqual(
        {
          id: 3,
          title: 'Seaside2',
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
          isPrivate: true,
          score: 0.0,
          places: [{
            title: 'BarOFish',
            description: 'Un endroit convivial pour manger des spécialités de la mer avec une magnifique vue.',
            latitude: 12.388,
            longitude: 23.378873,
            routesPlaces: {
              placeId: 1,
              routeId: 3
            }
          }],
          nbVoters: 0.0
        }
      )
    })
  })
})

describe('POST /routes', () => {
  test('Test we can create a new route', async () => {
    const data = {
      title: 'My first route',
      coordinates: {
        data: {
          latitude: [20.123456, 12.3242, 23.3178],
          longitude: [11.12345, 123.17278, 31.12887]
        }
      },
      estimatedDistance: 10000,
      estimatedTime: 1800,
      activityType: 'bike',
      isPrivate: true
    }
    const responsePost = await request(app)
      .post('/routes')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('x-access-token', LAMBDA_JWT)
      .send({ data: JSON.stringify(data) })

    expect(responsePost.statusCode).toBe(201)
    expect(responsePost.body.message).toBe('Nouveau parcours créé')
  })
  test('Test we can create a new route with places', async () => {
    const data = {
      title: 'My second route',
      coordinates: {
        data: {
          latitude: [20.123456, 12.3242, 23.3178],
          longitude: [11.12345, 123.17278, 31.12887]
        }
      },
      estimatedDistance: 10000,
      estimatedTime: 1800,
      activityType: 'bike',
      isPrivate: true,
      places: {
        ids: [1]
      }
    }
    const responsePost = await request(app)
      .post('/routes')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('x-access-token', LAMBDA_JWT)
      .send({ data: JSON.stringify(data) })

    expect(responsePost.statusCode).toBe(201)
    expect(responsePost.body.message).toBe('Nouveau parcours créé')
  })
  test('Test we cannot create a new route with an activity different than walk, run and bike', async () => {
    const data = {
      title: 'Seaside',
      coordinates: {
        data: {
          latitude: [20.123456],
          longitude: [11.12345]
        }
      },
      estimatedDistance: 10000,
      estimatedTime: 1800,
      activityType: 'swim',
      isPrivate: true
    }
    const responsePost = await request(app)
      .post('/routes')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('x-access-token', LAMBDA_JWT)
      .send({ data: JSON.stringify(data) })
    expect(responsePost.statusCode).toBe(400)
    expect(responsePost.body.message).toBe('Validation error: Activity type must be \'walk\', \'run\' or \'bike\'')
  })
  test('Test that we cannot create a new route without given the data', async () => {
    const data = {
      title: 'Seaside',
      coordinates: {
        data: {
          latitude: [20.123456],
          longitude: [11.12345]
        }
      },
      estimatedDistance: 10000,
      estimatedTime: 1800,
      activityType: 'swim',
      isPrivate: true
    }
    const responsePost = await request(app)
      .post('/routes')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('x-access-token', LAMBDA_JWT)
      .send({ body: JSON.stringify(data) })
    expect(responsePost.statusCode).toBe(400)
    expect(responsePost.body.message).toBe('Vous devez donner un parcours dans \'data\'')
  })
})

describe('DELETE /routes', () => {
  test('Test we cannot delete an user as a non-admin', async () => {
    const response = await request(app)
      .delete('/routes/1')
      .set('x-access-token', LAMBDA_JWT)
    expect(response.statusCode).toBe(403)
    expect(response.body.message).toBe(
      "Vous n'avez pas le droit d'effectuer cette action"
    )
  })
  test('Test that we cannot delete an unexisting route', async () => {
    const response = await request(app)
      .delete('/routes/100')
      .set('x-access-token', ADMIN_JWT)
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe("Le parcours n'existe pas")
  })
  test('Test if we can delete a route as an admin', async () => {
    const response = await request(app)
      .delete('/routes/1')
      .set('x-access-token', ADMIN_JWT)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Parcours supprimé')
  })
})
