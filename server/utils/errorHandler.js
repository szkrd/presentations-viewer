const http = require('http')
const logger = require('winston')
const PrettyError = require('pretty-error')
const config = require('../../config/server')
const pe = new PrettyError()

pe.appendStyle({
  'pretty-error > trace > item': {
    marginBottom: 0
  }
})

// catch all thrown errors, log and jsonize
module.exports = function * (next) {
  try {
    yield next
  } catch (err) {
    if (config.isDev) {
      console.log(pe.render(err).replace(/\n+/g, '\n'))
    } else {
      logger.error(err)
    }

    let resp = {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }

    if (err.message.startsWith('ValidationError')) {
      resp.status = 400
    }

    resp.error = http.STATUS_CODES[resp.status]
    this.status = resp.status
    this.body = resp
  }
}
