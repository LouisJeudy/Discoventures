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
  await placesModel.create({
    title: 'BarOFish',
    description: 'Un endroit convivial pour manger des spécialités de la mer avec une magnifique vue.',
    latitude: 12.388,
    longitude: 23.378873
  })
})

describe('GET /places/:latitude/:longitude', () => {
  test('Test if we can fetch a place based on its coordinates', async () => {
    const response = await request(app)
      .get('/places/12.388/23.378873')
      .set('x-access-token', ADMIN_JWT)
    expect(response.body.message).toBe('Lieu récupéré')
    expect(response.statusCode).toBe(200)
    expect(response.body.place).toStrictEqual(
      {
        id: 1,
        title: 'BarOFish',
        description: 'Un endroit convivial pour manger des spécialités de la mer avec une magnifique vue.',
        latitude: 12.388,
        longitude: 23.378873
      })
  })
  test('Test if we can fetch a place based on wrong coordinates', async () => {
    const response = await request(app)
      .get('/places/128/1')
      .set('x-access-token', ADMIN_JWT)
    expect(response.body.message).toBe('Aucun lieu associé')
    expect(response.statusCode).toBe(404)
  })
  test('Test that we cannot fetch all public users without a token', async () => {
    const response = await request(app)
      .get('/places/12.388/23.378873')
    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe('Token manquant')
  })
})

describe('POST /places', () => {
  test('Test we can create a new place', async () => {
    const data = {
      title: 'Tour Eiffel',
      description: 'Tour de fer puddlé de 330 m de hauteur située à Paris, à l\'extrémité nord-ouest du parc du Champ-de-Mars en bordure de la Seine dans le 7ᵉ arrondissement. Son adresse officielle est 5, avenue Anatole-France.',
      longitude: '43',
      latitude: '12'
    }
    const responsePost = await request(app)
      .post('/places')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('x-access-token', LAMBDA_JWT)
      .send({ data: JSON.stringify(data) })

    expect(responsePost.statusCode).toBe(201)
    expect(responsePost.body.message).toBe('Nouveau lieu ajouté')
    expect(responsePost.body.place).toStrictEqual({
      id: 2,
      title: 'Tour Eiffel',
      description: 'Tour de fer puddlé de 330 m de hauteur située à Paris, à l\'extrémité nord-ouest du parc du Champ-de-Mars en bordure de la Seine dans le 7ᵉ arrondissement. Son adresse officielle est 5, avenue Anatole-France.',
      longitude: '43',
      latitude: '12'
    })
  })
  test('Test we cannot create a place with the same latitude and longitude as another one', async () => {
    const data = {
      title: 'Vaudoise aréna',
      description: 'complexe sportif dédié à des activités sur glace, ainsi qu\'à des événements divers, inauguré en 2019 et situé sur le territoire de la commune vaudoise de Prilly, en Suisse.',
      longitude: '43',
      latitude: '12'
    }
    const responsePost = await request(app)
      .post('/places')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('x-access-token', LAMBDA_JWT)
      .send({ data: JSON.stringify(data) })

    expect(responsePost.statusCode).toBe(400)
    expect(responsePost.body.message).toBe('Lieu déjà existant')
  })
  test('Test we cannot create a new route without all attributes', async () => {
    const data = {
      description: 'Tour de fer puddlé de 330 m de hauteur située à Paris, à l\'extrémité nord-ouest du parc du Champ-de-Mars en bordure de la Seine dans le 7ᵉ arrondissement. Son adresse officielle est 5, avenue Anatole-France.',
      longitude: '43',
      latitude: '12'
    }
    const responsePost = await request(app)
      .post('/places')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('x-access-token', LAMBDA_JWT)
      .send({ data: JSON.stringify(data) })

    expect(responsePost.statusCode).toBe(400)
    expect(responsePost.body.message).toBe('Attribut manquant dans data')
  })
  test('Test we cannot create a new route without data', async () => {
    const data = {
      description: 'Tour de fer puddlé de 330 m de hauteur située à Paris, à l\'extrémité nord-ouest du parc du Champ-de-Mars en bordure de la Seine dans le 7ᵉ arrondissement. Son adresse officielle est 5, avenue Anatole-France.',
      longitude: '43',
      latitude: '12'
    }
    const responsePost = await request(app)
      .post('/places')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('x-access-token', LAMBDA_JWT)

    expect(responsePost.statusCode).toBe(400)
    expect(responsePost.body.message).toBe('Attribut \'data\' manquant')
  })
})
