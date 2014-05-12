var _ = require('lodash')
  , save = require('save')
  , crudService = require('crud-service')
  , logger = require('./null-logger')

function createPublicQuery(query, options) {
  var now = options && options.date ? options.date : new Date()
    , publicQuery = _.extend({}, query,
    { state: 'Published'
    , $and:
      [ { $or: [{ liveDate: null }, { liveDate: { $lte: now } }] }
      , { $or: [{ expiryDate: null }, { expiryDate: { $gte: now } } ] }
      ]
    })

  if (query.previewId) {
    publicQuery = query
  }

  return publicQuery
}

module.exports = function(saveEngine) {
  return function () {
    var articleSave = save('article',
        // Create a unique name for the memgo engine so it always starts empty.
        { engine: saveEngine, debug: false, logger: logger })
      , schema = require('./article-schema')([], articleSave)
      , service = crudService('article', articleSave, schema)

    // Find the articles that are available to the public
    service.findPublic = function (query, options, callback) {
      service.find(createPublicQuery(query, options), options, callback)
    }

    return service
  }
}
