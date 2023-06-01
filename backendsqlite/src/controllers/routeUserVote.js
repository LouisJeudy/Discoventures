const status = require('http-status')
const CodeError = require('../util/CodeError.js')
const routeUserVoteModel = require('../models/routesUsersVote.js')
const routesModel = require('../models/routes.js')
const has = require('has-keys')

module.exports = {
  // TODO: Gérer contrainte d'unicité
  async newRouteUserVote (req, res) {
    // #swagger.tags = ['RoutesUsersVote']
    // #swagger.summary = 'Create a new vote for a route by a user'
    // #swagger.parameters['x-access-token'] = { in: 'header', description: 'JWT token', required: 'true', type: 'string' }
    // #swagger.parameters['data'] = { in: 'body', schema: { $note: 5 }}
    // #swagger.reponses[400] = { description: 'Missing id'}
    const dataJSON = JSON.parse(req.body.data)

    if (!has(req.params, 'id')) throw new CodeError('ID manquant', status.BAD_REQUEST)
    // #swagger.reponses[400] = { description: 'Missing data attribute'}
    if (!has(req.body, 'data')) throw new CodeError('Attribut \'data\' manquant', status.BAD_REQUEST)
    // #swagger.reponses[400] = { description: 'Missing note attribute in data'}
    if (!has(dataJSON, 'note')) throw new CodeError('Attribut \'note\' dans data manquant', status.BAD_REQUEST)

    await routeUserVoteModel.create({ note: dataJSON.note, userId: req.user.id, routeId: req.params.id })
    // #swagger.reponses[201] = { description: 'New vote successfully added.'}
    const route = await routesModel.findOne({ where: { id: req.params.id } })

    const newScore = (route.nbVoters * route.score + dataJSON.note) / (route.nbVoters + 1)

    await route.update({ score: newScore, nbVoters: route.nbVoters + 1 })
    await route.save()

    return res
      .status(201)
      .send({ status: status.CREATED, message: 'Nouveau vote ajouté' })
  }
}

// const newScore = (route.nbVoters * route.score + dataJSON.note) / route.nbVoters + 1

// await route.increment('nbVoters')
// await route.update({ score: newScore })
// await route.save()
