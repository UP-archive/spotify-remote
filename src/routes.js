const SpotifyMain = require('./modules/APIs/main')
const sAPI = require('./modules/APIs/client')
const IndexPage = require('./pages/index')
const NoAuth = require('./pages/index_noAuth')
const controller = require('./pages/api/controller')

async function Routes(app, root, io) {
  app.get('/', async (req, res) => {
    const token = req.session.spotifyAccount

    if (token === undefined) {
      res.send(NoAuth)
    } else {
      res.send(IndexPage(token['access_token']))
    }
  })

  app.get('/controller', async (req, res) => {
    res.send(controller)
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

  await SpotifyMain(app, root, io)
}

module.exports = Routes
