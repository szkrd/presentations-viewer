const path = require('path')
const fs = require('co-fs')
const joi = require('joi')
const mime = require('mime-types')
const joiValidate = require('../../utils/joiValidate')
const getMetaData = require('../../models/getMetaData')
const config = require('../../../config/server')

// we serve the images through the api, which is not
// the most optimal thing ever but deal with it
module.exports = function * () {
  const params = joiValidate(this.params, {
    presentationId: joi.string().regex(/^[a-z0-9-]*$/),
    imageName: joi.string().regex(/^[a-z0-9-_\.]*$/)
  })
  const meta = getMetaData().find((item) => item.id === params.presentationId)
  if (!meta) {
    this.throw('Presentation not found', 404)
  }

  if (!/\.(jpe?g|png|gif|svg)$/.test(params.imageName)) {
    this.throw('Invalid file extension', 400)
  }

  const fileName = path.normalize(`${config.data}/${meta.name}/${params.imageName}`)
  let stats
  try {
    stats = yield fs.stat(fileName)
  } catch (err) {
    this.throw('File not found', 404)
  }

  let buffer
  try {
    buffer = yield fs.readFile(fileName)
  } catch (err) {
    this.throw('File read error', 500)
  }

  // if I get bored, I may add proper etag and lm handling...
  // right now I force the client to cache it forever.
  const contentType = mime.contentType(path.extname(fileName))
  this.set({
    'Content-Type': contentType,
    'Cache-Control': 'max-age=31556926', // one year
    'Last-Modified': stats.mtime.toUTCString()
  })
  this.body = buffer
}
