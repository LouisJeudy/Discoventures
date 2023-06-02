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
})

describe('GET /users', () => {
  test('Test if we can fetch all users as an admin', async () => {
    const response = await request(app)
      .get('/users')
      .set('x-access-token', ADMIN_JWT)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Utilisateurs disponibles')
    expect(response.body.data.length).toBe(4)
  })
  test('Test that we can fetch all users as a lambda user', async () => {
    const response = await request(app)
      .get('/users')
      .set('x-access-token', LAMBDA_JWT)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Utilisateurs disponibles')
    expect(response.body.data.length).toBe(4)
  })
  test('Test that we cannot fetch all users without a token', async () => {
    const response = await request(app)
      .get('/users')
    expect(response.statusCode).toBe(401)
    expect(response.body.message).toBe('Token manquant')
  })
})

describe('GET /users/:id', () => {
  test('Test if the token of the user return the correct data', async () => {
    const responseGet = await request(app)
      .get('/users/3')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('x-access-token', ADMIN_JWT)
    expect(responseGet.statusCode).toBe(200)
    expect(responseGet.body.message).toBe("Données de l'utilisateur")
    expect(responseGet.body.data).toStrictEqual({
      id: 3,
      username: 'Admin',
      email: 'admin@email.com',
      isadmin: true
    })
  })

  test('Test that a lambda user cannot fetch the data of another user', async () => {
    const responseGet = await request(app)
      .get('/users/3')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('x-access-token', LAMBDA_JWT)
    expect(responseGet.statusCode).toBe(403)
    expect(responseGet.body.message).toBe(
      "Vous n'avez pas le droit d'effectuer cette action"
    )
  })

  test("Test if user doesn't exist return an error", async () => {
    const responseGet = await request(app)
      .get('/users/100')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .set('x-access-token', ADMIN_JWT)
    expect(responseGet.statusCode).toBe(404)
    expect(responseGet.body.message).toBe("L'utilisateur n'existe pas")
  })
})

describe('POST /users', () => {
  test('Test that we can create a new user', async () => {
    const data = {
      username: 'pierre',
      email: 'pierre@email.com',
      password: '!A1o2e3r4'
    }
    const responsePost = await request(app)
      .post('/users')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({ data: JSON.stringify(data) })

    expect(responsePost.statusCode).toBe(201)
    expect(responsePost.body.message).toBe('Utilisateur créé')

    // Vérification de l'ajout de la donnée
    const responseGet = await request(app)
      .get('/users')
      .set('x-access-token', ADMIN_JWT)
    expect(responseGet.statusCode).toBe(200)
    expect(responseGet.body.message).toBe('Utilisateurs disponibles')
    expect(responseGet.body.data.length).toBe(5)
  })

  test('Test that we cannot create a new user without the username', async () => {
    const data = {
      email: 'unique@email.com',
      password: '!A1o2e3r4'
    }
    const responsePost = await request(app)
      .post('/users')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({ data: JSON.stringify(data) })
    expect(responsePost.statusCode).toBe(403)
    expect(responsePost.body.message).toBe('Vous devez spécifier un nom d\'utilisateur')
  })
  test('Test that we cannot create a new user without the e-mail', async () => {
    const data = {
      username: 'NewUser',
      password: '!A1o2e3r4'
    }
    const responsePost = await request(app)
      .post('/users')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({ data: JSON.stringify(data) })
    expect(responsePost.statusCode).toBe(403)
    expect(responsePost.body.message).toBe('Vous devez spécifier une adresse e-mail')
  })

  test('Test that we cannot create a new user with an existing username', async () => {
    const data = {
      username: 'pierre',
      email: 'unique@email.com',
      password: '!A1o2e3r4'
    }
    const responsePost = await request(app)
      .post('/users')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({ data: JSON.stringify(data) })
    expect(responsePost.statusCode).toBe(403)
    expect(responsePost.body.message).toBe("Nom d'utilisateur déjà utilisé")
  })

  test('Test that we cannot create a new user with an existing e-mail', async () => {
    const data = {
      username: 'NewUser',
      email: 'pierre@email.com',
      password: '!A1o2e3r4'
    }
    const responsePost = await request(app)
      .post('/users')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({ data: JSON.stringify(data) })
    expect(responsePost.statusCode).toBe(403)
    expect(responsePost.body.message).toBe('E-mail déjà utilisé !')
  })
  test('Test that we cannot create a new user with an username length > 16 characters', async () => {
    const data = {
      username: 'usernamewaytoolong',
      email: 'long@email.com',
      password: '!A1o2e3r4'
    }
    const responsePost = await request(app)
      .post('/users')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({ data: JSON.stringify(data) })
    expect(responsePost.statusCode).toBe(403)
    expect(responsePost.body.message).toBe(
      "Nom d'utilisateur doit être inférieur à 16 caractères"
    )
  })
  test('Test that we cannot create an user with a weak password', async () => {
    const data = {
      username: 'Joe',
      email: 'joe42@email.com',
      password: 'louis'
    }
    const responsePost = await request(app)
      .post('/users')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({ data: JSON.stringify(data) })
    expect(responsePost.statusCode).toBe(403)
    expect(responsePost.body.message).toBe('Mot de passe trop faible')
  })
})

describe('GET /getjwtDeleg/:id', () => {
  test('Test if we can get the jwt token of an existing user', async () => {
    const responseGet = await request(app).get('/getjwtDeleg/3')
    expect(responseGet.statusCode).toBe(200)
    expect(responseGet.body.message).toBe('Jeton retourné')
    expect(responseGet.body.token).toBe(ADMIN_JWT)
  })
  test('Test that we cannot get the jwt token of an unexisting user', async () => {
    const responseGet = await request(app).get('/getjwtDeleg/100')
    expect(responseGet.statusCode).toBe(404)
    expect(responseGet.body.message).toBe("L'utilisateur n'existe pas")
  })
})

describe('POST /login', () => {
  test('Test if the token of the user return the correct username', async () => {
    const response = await request(app).post('/login').set('Content-type', 'application/x-www-form-urlencoded').send({ email: 'lambda@email.com', password: '!A1o2e3r4' })
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Email/Mot de passe ok')
    expect(response.body.token).toBe(LAMBDA_JWT)
  })

  test('Test login if the user doesn\'t exist in the DB', async () => {
    const response = await request(app).post('/login').set('Content-type', 'application/x-www-form-urlencoded').send({ email: 'notexist@email.com', password: '!A1o2e3r4' })
    expect(response.statusCode).toBe(403)
    expect(response.body.message).toBe('Les identifiants ne sont pas corrects')
  })
})

describe('DELETE /users', () => {
  test('Test we cannot delete an user as a non-admin', async () => {
    const response = await request(app)
      .delete('/users/3')
      .set('x-access-token', LAMBDA_JWT)
    expect(response.statusCode).toBe(403)
    expect(response.body.message).toBe(
      "Vous n'avez pas le droit d'effectuer cette action"
    )
  })
  test('Test if we can delete an user as an admin', async () => {
    const response = await request(app)
      .delete('/users/2')
      .set('x-access-token', ADMIN_JWT)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Utilisateur supprimé')
  })
  test('Test that we cannot delete an unexisting user', async () => {
    const response = await request(app)
      .delete('/users/100')
      .set('x-access-token', ADMIN_JWT)
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe("L'utilisateur n'existe pas")
  })
  test('Test we cannot delete all users as a non-admin', async () => {
    const response = await request(app)
      .delete('/users')
      .set('x-access-token', LAMBDA_JWT)
    expect(response.statusCode).toBe(403)
    expect(response.body.message).toBe(
      "Vous n'avez pas le droit d'effectuer cette action"
    )
  })
  test('DELETE users : Test if delete all users works with initialized table user', async () => {
    const response = await request(app)
      .delete('/users')
      .set('x-access-token', ADMIN_JWT)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Utilisateurs supprimés')
  })
})
