const shell = require('shelljs')
const config = require('../../config/server')
const sanitizeDir = require('../utils/sanitizeDir')

// read available presentations on startup, generate metadata
const body = []
shell.ls(config.data).map(dir => {
  if (/^\d{4}_/.test(dir)) {
    body.push({
      id: sanitizeDir(dir), // url firendly slug
      name: dir // original directory name
    })
  }
})

module.exports = () => body
