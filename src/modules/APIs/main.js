const SpotifyWebApi = require('spotify-web-api-node')

const { AuthIn, AuthCallback } = require('./auth')

const sAPI = new SpotifyWebApi({
  clientId: process.env.clientID,
  clientSecret: process.env.clientSecret,
  redirectUri: process.env.redirect_uri,
})

async function SpotifyMain(app, root) {
  // Auth
  app.get('/api/auth/login', async (req, res) => {
    await AuthIn(req, res, sAPI)
  })

  app.get('/api/auth/logout', (req, res) => {})

  app.get('/api/auth/callback', async (req, res) => {
    await AuthCallback(req, res, sAPI)
  })

  // Play

  // Previous

  // Next

  // Vol Up

  // Vol Down
}

module.exports = SpotifyMain
