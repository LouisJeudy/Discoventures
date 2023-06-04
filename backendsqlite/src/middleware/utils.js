const CodeError = require('../util/CodeError.js')
const status = require('http-status')

module.exports = {
  async notAllowed (req, res) {
    // #swagger.tags = ['Not allowed']
    // #swagger.responses[405] = {description: "Method not allowed"}
    throw new CodeError('Method not allowed', status.METHOD_NOT_ALLOWED)
  }
}
