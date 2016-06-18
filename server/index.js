const logger = require('winston')
const koa = require('koa')
const Router = require('koa-router')
const config = require('../config/server')
const errorHandler = require('./utils/errorHandler')

logger.default.transports.console.colorize = true
logger.default.transports.console.prettyPrint = true
logger.level = config.logLevel

const meta = require('./routes/meta')
const presentation = require('./routes/presentation')

const app = koa()
const router = new Router()

router
  .get('/meta', meta.get)
  .get('/presentation/:id', presentation.get)

app.use(errorHandler)
app.use(router.routes())
app.listen(config.port)
