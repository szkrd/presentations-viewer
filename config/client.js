require('dotenv')

const config = {
  devPort: process.env.DEV_PORT || 3001,
  devServer: process.env.DEV_SERVER || 'http://localhost:3000'
}

module.exports = config
