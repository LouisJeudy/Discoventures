const app = require('../app')
const request = require('supertest')

const TOKENTEST = 'eyJhbGciOiJIUzI1NiJ9.cGllcnJlQGNvbS5mcg.OKtuBp96TABbvBU1llQZEfzTbbzzyT1X2W5jSgvd0jQ'
const WRONGTOKENTEST = 'eyJhbGciOiJIUzI1NiJ9.cGllcnJlQGNvbS5mcg.OKtuBp96TABbvBU1llQZEfzTbbzzyT1'
// Token of user doesn't exist in DB
const TOKENDISABLED = 'eyJhbGciOiJIUzI1NiJ9.dGVzdEBjb20uZnI.O9kQp22qLWDR2tpJ-Z8ZrpDi3Ui0QEGduX8MrW5XMS0'
const ADMINTOKEN = 'eyJhbGciOiJIUzI1NiJ9.ZmVpQGdtYWlsLmNvbQ.5vA3uPsxyYgV9C7Z66Gtmp6gXNmzpq21-dLEgSYq8gE'

describe('/users', () => {
  test('GET user : Test if get users works with initialized table user', async () => {
    const response = await request(app).get('/users')
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Utilisateurs disponibles')
    expect(response.body.data.length).toBe(2)
  })
  test('POST user : Test if post users works with initialized table user', async () => {
    const data = {
      username: 'pierre',
      email: 'pierre@com.fr',
      password: '!A1o2e3r4'
    }
    const responsePost = await request(app).post('/users').set('Content-type', 'application/x-www-form-urlencoded').send({ data: JSON.stringify(data) })

    expect(responsePost.statusCode).toBe(201)
    expect(responsePost.body.message).toBe('Utilisateur créé')

    // Vérification de l'ajout de la donnée
    const responseGet = await request(app).get('/users')
    expect(responseGet.statusCode).toBe(200)
    expect(responseGet.body.message).toBe('Utilisateurs disponibles')
    expect(responseGet.body.data.length).toBe(3)
  })
  test('POST already user exists (username) : Test if post user already exist generate an error', async () => {
    const data = {
      username: 'pierre',
      email: 'pierre@com.fr',
      password: '!A1o2e3r4'
    }
    const responsePost = await request(app).post('/users').set('Content-type', 'application/x-www-form-urlencoded').send({ data: JSON.stringify(data) })

    expect(responsePost.statusCode).toBe(403)
    expect(responsePost.body.message).toBe('Nom d\'utilisateur déjà utilisé !')
  })
  test('POST already user exists (email) : Test if post user already exist generate an error', async () => {
    const data = {
      username: 'louis',
      email: 'pierre@com.fr',
      password: '!A1o2e3r4'
    }
    const responsePost = await request(app).post('/users').set('Content-type', 'application/x-www-form-urlencoded').send({ data: JSON.stringify(data) })

    expect(responsePost.statusCode).toBe(403)
    expect(responsePost.body.message).toBe('Email déjà utilisé !')
  })
  test('POST username length > 16 caracters : Test if post user already exist generate an error', async () => {
    const data = {
      username: 'louisjeudy86170cvndsh',
      email: 'louis86@com.fr',
      password: '!A1o2e3r4'
    }
    const responsePost = await request(app).post('/users').set('Content-type', 'application/x-www-form-urlencoded').send({ data: JSON.stringify(data) })

    expect(responsePost.statusCode).toBe(403)
    expect(responsePost.body.message).toBe('Le nom d\'utilisateur doit être supérieur à 16 caractères')
  })
  test('POST invalid pasword : Test if post with weak password generate an error', async () => {
    const data = {
      username: 'louisjeudy',
      email: 'louis86@com.fr',
      password: 'louis'
    }
    const responsePost = await request(app).post('/users').set('Content-type', 'application/x-www-form-urlencoded').send({ data: JSON.stringify(data) })

    expect(responsePost.statusCode).toBe(403)
    expect(responsePost.body.message).toBe('Mot de passe erroné !')
  })
  test('DELETE user : Test delete user with token which the user isn\'t admin', async () => {
    const response = await request(app).delete('/users/1').set('x-access-token', TOKENTEST)
    expect(response.statusCode).toBe(403)
    expect(response.body.message).toBe('Vous n\'êtes pas administrateur pour cette action !')
  })
  test('DELETE user : Test if delete user works with initialized table user', async () => {
    const response = await request(app).delete('/users/1').set('x-access-token', ADMINTOKEN)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Utilisateur supprimé')
  })
  test('DELETE user doesn\'t exist : Test if delete user doesn\'t exist generate error 406', async () => {
    const response = await request(app).delete('/users/100').set('x-access-token', ADMINTOKEN)
    expect(response.statusCode).toBe(403)
    expect(response.body.message).toBe('L\'utilisateur n\'existe pas !')
  })
  test('DELETE users : Test if delete all users with token which the user isn\'t admin', async () => {
    const data = {
      username: 'mark',
      email: 'mark@com.fr',
      password: '!A1o2e3r4'
    }
    const responsePost = await (await request(app).post('/users').set('Content-type', 'application/x-www-form-urlencoded').send({ data: JSON.stringify(data) }))
    expect(responsePost.statusCode).toBe(201)
    expect(responsePost.body.message).toBe('Utilisateur créé')

    const response = await request(app).delete('/users').set('x-access-token', TOKENTEST)
    expect(response.statusCode).toBe(403)
    expect(response.body.message).toBe('Vous n\'êtes pas administrateur pour cette action !')
  })
  test('DELETE users : Test if delete all users works with initialized table user', async () => {
    const response = await request(app).delete('/users').set('x-access-token', ADMINTOKEN)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Utilisateurs supprimés')
  })
})

describe('GET /getjwtDeleg/user', () => {
  test('Test if get jwt token works with initialized table user', async () => {
    const data = {
      username: 'pierre',
      email: 'pierre@com.fr',
      password: '!A1o2e3r4'
    }
    await request(app).post('/users').set('Content-type', 'application/x-www-form-urlencoded').send({ data: JSON.stringify(data) })

    const responseGet = await request(app).get('/getjwtDeleg/pierre')
    expect(responseGet.statusCode).toBe(200)
    expect(responseGet.body.message).toBe('Jeton retourné')
  })
  test('Test if get jwt token of user doesn\'t exist gives an error 404 ', async () => {
    const responseGet = await request(app).get('/getjwtDeleg/monica')
    expect(responseGet.statusCode).toBe(404)
    expect(responseGet.body.message).toBe('L\'utilisateur n\'existe pas !')
  })
})

describe('GET /users/data', () => {
  test('Test if the token of the user return the correct username', async () => {
    const responseGet = await request(app).get('/users/data').set('Content-type', 'application/x-www-form-urlencoded').set('x-access-token', TOKENTEST)
    expect(responseGet.statusCode).toBe(200)
    expect(responseGet.body.message).toBe('Données de l\'utilisateur')
  })

  test('Test if invalid token return an error', async () => {
    const responseGet = await request(app).get('/users/data').set('Content-type', 'application/x-www-form-urlencoded').set('x-access-token', WRONGTOKENTEST)
    expect(responseGet.statusCode).toBe(400)
    expect(responseGet.body.message).toBe('Invalid token !')
  })

  test('Test if user doesn\'t exist return an error', async () => {
    const responseGet = await request(app).get('/users/data').set('Content-type', 'application/x-www-form-urlencoded').set('x-access-token', TOKENDISABLED)
    expect(responseGet.statusCode).toBe(404)
    expect(responseGet.body.message).toBe('L\'utilisateur n\'existe pas !')
  })
})

describe('POST /login', () => {
  test('Test if the token of the user return the correct username', async () => {
    const responseGet = await request(app).post('/login').set('Content-type', 'application/x-www-form-urlencoded').send({ email: 'pierre@com.fr', password: '!A1o2e3r4' })
    expect(responseGet.statusCode).toBe(200)
    expect(responseGet.body.message).toBe('Email/Mot de passe ok')
    expect(responseGet.body.token).toBe(TOKENTEST)
  })

  test('Test login if the user doesn\'t exist in the DB', async () => {
    const responseGet = await request(app).post('/login').set('Content-type', 'application/x-www-form-urlencoded').send({ email: 'notexist@com.fr', password: '!A1o2e3r4' })
    expect(responseGet.statusCode).toBe(403)
    expect(responseGet.body.message).toBe('Les identifiants ne sont pas correctes')
  })
})

// Delete tous les utilisateur être admin
// Avoir au moins une fois l'erreur.
