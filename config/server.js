require('dotenv').config();

['DATA'].forEach(req => {
  if (!process.env[req]) {
    throw new Error(`Env var "${req}" missing!`)
  }
})

const env = process.env.NODE_ENV || 'production'

const config = {
  env,
  isTest: env === 'test',
  isProduction: env === 'production',
  isDev: env === 'development',
  logLevel: process.env.LOG_LEVEL || 'error',
  port: process.env.PORT || 3000,
  data: process.env.DATA
}

module.exports = config
