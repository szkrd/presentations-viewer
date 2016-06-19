require('dotenv').config()

const config = {
  defaultTheme: process.env.DEFAULT_THEME || 'light',
  devPort: process.env.DEV_PORT || 3001,
  devServer: process.env.DEV_SERVER || 'http://localhost:3000'
}

module.exports = config
