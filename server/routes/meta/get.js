const getMetaData = require('../../models/getMetaData')

module.exports = function * () {
  this.body = getMetaData()
}
