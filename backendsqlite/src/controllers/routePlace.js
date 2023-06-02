const status = require('http-status')
const routeModel = require('../models/routes.js')

module.exports = {
  async getPlaces (req, res) {
    // #swagger.tags = ['Routes']
    // #swagger.summary = 'Get all public routes'
    // #swagger.parameters['x-access-token'] = { in: 'header', description: 'JWT token', required: 'true', type: 'string' }
    // #swagger.responses[200] = {description: 'Returning all public routes', schema: {$data: [{$id: '1', $title: 'Walk in the woods', $coordinates: {data: { latitude: [20.234, 40.123], longitude: [12.3674, 45.32789]}}, $estimatedDistance: 2, $estimatedTime: 2, $isPrivate: false, $score: 0.0, $nbVoters: 0, $activityType: 'walk' }]}}
    const data = await routeModel.findAll({
      attributes: { exclude: ['isPrivate'] },
      where: { isPrivate: false }
    })
    res.json({ status: status.OK, message: 'Tous les parcours publics', data })
  }
}
