const status = require('http-status')
const CodeError = require('../util/CodeError.js')
const routeUserVoteModel = require('../models/routesUsersVote.js')
const routesModel = require('../models/routes.js')
const has = require('has-keys')

module.exports = {
  async newRouteUserVote (req, res) {
    // #swagger.tags = ['RoutesUsersVote']
    // #swagger.summary = 'Create a new vote for a route by a user'
    // #swagger.parameters['id'] = {in: 'path', type: 'integer', description: 'id of the route', required: 'true'}
    // #swagger.parameters['x-access-token'] = { in: 'header', description: 'JWT token', required: 'true', type: 'string' }
    // #swagger.parameters['data'] = { in: 'body', schema: { $note: 5 }}

    // #swagger.reponses[400] = { description: 'Missing id'}
    if (!has(req.params, 'id')) throw new CodeError('ID manquant', status.BAD_REQUEST)
    // #swagger.reponses[400] = { description: 'Missing data attribute'}
    if (!has(req.body, 'data')) throw new CodeError('Attribut \'data\' manquant', status.BAD_REQUEST)

    const dataJSON = JSON.parse(req.body.data)
    // #swagger.reponses[400] = { description: 'Missing note attribute in data'}
    if (!has(dataJSON, 'note')) throw new CodeError('Attribut \'note\' dans data manquant', status.BAD_REQUEST)

    const routeVoteExists = await routeUserVoteModel.findOne({
      where: { userId: req.user.id, routeId: req.params.id }
    })
    // #swagger.reponses[409] = { description: 'A note is already given for this route'}
    if (routeVoteExists) {
      throw new CodeError('Vote déjà effectué pour ce parcours', status.CONFLICT)
    }
    await routeUserVoteModel.create({ note: dataJSON.note, userId: req.user.id, routeId: req.params.id })
    const route = await routesModel.findOne({ where: { id: req.params.id } })

    const newScore = (route.nbVoters * route.score + dataJSON.note) / (route.nbVoters + 1)

    await route.update({ score: newScore, nbVoters: route.nbVoters + 1 })
    await route.save()

    // #swagger.reponses[201] = { description: 'New vote successfully added.'}
    return res
      .status(201)
      .send({ status: status.CREATED, message: 'Nouveau vote ajouté' })
  }
}
