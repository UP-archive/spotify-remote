const { AuthIn, AuthCallback } = require('./auth')
const sAPI = require('./client')

async function SpotifyMain(app, root) {
  // Auth
  app.get('/api/auth/login', async (req, res) => {
    await AuthIn(req, res, sAPI)
  })

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
