const fs = require('co-fs')
const joi = require('joi')
const joiValidate = require('../../utils/joiValidate')
const getMetaData = require('../../models/getMetaData')
const config = require('../../../config/server')

module.exports = function * () {
  const params = joiValidate(this.params, {
    id: joi.string().regex(/^[a-z0-9-]*$/)
  })
  const meta = getMetaData()
  const active = meta.find((item) => item.id === params.id)
  if (!active) {
    this.throw('Presentation not found', 404)
  }

  const fileName = `${config.data}/${active.name}/README.md`.replace(/\/+/g, '/')
  let contents
  try {
    contents = yield fs.readFile(fileName, 'utf8')
  } catch (err) {
    this.throw('File not found error', 404)
  }

  let pages = (contents || '').split(/(-{3,})[\r\n]+\1[\r\n]+/) // double "---"
  pages = pages.filter(s => !/^-+$/.test(s))

  this.body = {
    id: params.id,
    name: active.name,
    pages
  }
}
