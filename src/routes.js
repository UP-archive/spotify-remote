const url = require('url')
const SpotifyMain = require('./modules/APIs/main')

async function Routes(app, root) {
  app.get('/', (req, res) => {
    console.log(req.session.spotifyAccount)
    res.json(req.session.spotifyAccount)
  })

  SpotifyMain(app, root)
}

module.exports = Routes
