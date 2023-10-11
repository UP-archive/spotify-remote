const SpotifyMain = require('./modules/APIs/main')
const sAPI = require('./modules/APIs/client')
const index = require('./pages/index')

async function Routes(app, root) {
  app.get('/', async (req, res) => {
    res.send(index)
  })

  app.get('/user', async (req, res) => {
    try {
      sAPI.setAccessToken(req.session.spotifyAccount['access_token'])
      sAPI.setRefreshToken(req.session.spotifyAccount['refresh_token'])
      var result = await sAPI.getMe()
      res.status(200).send(result.body)
    } catch (err) {
      res.status(400).send(err)
    }
  })

  await SpotifyMain(app, root)
}

module.exports = Routes
