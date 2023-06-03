const status = require('http-status')
const CodeError = require('../util/CodeError.js')
const placesModel = require('../models/places.js')
const has = require('has-keys')

module.exports = {
  async newPlace (req, res) {
    // #swagger.tags = ['Places']
    // #swagger.summary = 'Create a new place'
    // #swagger.parameters['x-access-token'] = { in: 'header', description: 'JWT token', required: 'true', type: 'string' }
    // #swagger.parameters['data'] = { in: 'body', schema: { $title: 'Tour Eiffel', $description: "Tour de fer puddlé de 330 m2 de hauteur (avec antennes) située à Paris, à l’extrémité nord-ouest du parc du Champ-de-Mars en bordure de la Seine dans le 7e arrondissement. Son adresse officielle est 5, avenue Anatole-France.", $longitude: 448258.15, $latitude: 5411953.63 }}
    if (!has(req.body, 'data')) throw new CodeError('Attribut \'data\' manquant', status.BAD_REQUEST)
    // #swagger.reponses[400] = { description: 'Missing note attribute in data'}
    const dataJSON = JSON.parse(req.body.data)
    if (!has(dataJSON, 'title') || !has(dataJSON, 'description' || !has(dataJSON, 'longitude') || !has(dataJSON, 'latitude'))) { throw new CodeError('Attribut manquant dans data', status.BAD_REQUEST) }
    const placeExists = await placesModel.findOne({
      where: { longitude: dataJSON.longitude, latitude: dataJSON.latitude }
    })
    // #swagger.reponses[400] = { description: 'Place already exists'}
    if (placeExists) {
      throw new CodeError('Lieu déjà existant', status.BAD_REQUEST)
    }
    const place = await placesModel.create({ title: dataJSON.title, description: dataJSON.description, longitude: dataJSON.longitude, latitude: dataJSON.latitude })
    // #swagger.reponses[201] = { description: 'New place successfully added.', schema: { "place": {$id: &, $title: $description: "Tour Eiffel", Tour de fer puddlé de 330 m2 de hauteur (avec antennes) située à Paris, à l’extrémité nord-ouest du parc du Champ-de-Mars en bordure de la Seine dans le 7e arrondissement. Son adresse officielle est 5, avenue Anatole-France.", $longitude: 448258.15, $latitude: 5411953.63 }} }
    return res
      .status(201)
      .send({ status: status.CREATED, message: 'Nouveau lieu ajouté', place })
  },

  async getPlaceByCoords (req, res) {
    // #swagger.tags = ['Places']
    // #swagger.summary = 'Get a place by its coordinates'
    // #swagger.parameters['longitude'] = {in: 'path', type: 'string', description: 'Longitude of the place', required: 'true'}
    // #swagger.parameters['latitude'] = {in: 'path', type: 'string', description: 'Latitude of the place', required: 'true'}
    // #swagger.parameters['x-access-token'] = { in: 'header', description: 'JWT token', required: 'true', type: 'string' }

    // #swagger.reponses[400] = { description: 'Missing longitude'}
    if (!has(req.params, 'longitude')) throw new CodeError('Longitude manquant', status.BAD_REQUEST)
    // #swagger.reponses[400] = { description: 'Missing latitude'}
    if (!has(req.params, 'latitude')) throw new CodeError('Latitude manquant', status.BAD_REQUEST)

    const place = await placesModel.findOne({
      where: { latitude: parseFloat(req.params.latitude), longitude: parseFloat(req.params.longitude) }
    })
    // #swagger.reponses[404] = { description: 'Place does not exist'}
    if (!place) {
      throw new CodeError('Aucun lieu associé', status.NOT_FOUND)
    }
    // #swagger.reponses[201] = { description: 'Place successfully found.' schema: { "place": {$id: &, $title: $description: "Tour Eiffel", Tour de fer puddlé de 330 m2 de hauteur (avec antennes) située à Paris, à l’extrémité nord-ouest du parc du Champ-de-Mars en bordure de la Seine dans le 7e arrondissement. Son adresse officielle est 5, avenue Anatole-France.", $longitude: 448258.15, $latitude: 5411953.63 }}}
    return res
      .status(200)
      .send({ status: status.OK, message: 'Lieu récupéré', place })
  }
}
