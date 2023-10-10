const SpotifyMain = require('./modules/APIs/main')
const sAPI = require('./modules/APIs/client')

async function Routes(app, root) {
  app.get('/', async (req, res) => {
    // console.log(req.session.spotifyAccount)
    // res.json(req.session.spotifyAccount)
    try {
      sAPI.setAccessToken(req.session.spotifyAccount['access_token'])
      sAPI.setRefreshToken(req.session.spotifyAccount['refresh_token'])
      var result = await sAPI.getMe()
      console.log(result.body)
      res.status(200).send(result.body)
    } catch (err) {
      res.status(400).send(err)
    }
  })

  await SpotifyMain(app, root)
}

module.exports = Routes
