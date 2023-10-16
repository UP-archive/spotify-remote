const { AuthIn, AuthCallback } = require('./auth')
const sAPI = require('./client')
const spt_Play = require('../../pages/api/socket/play')
const spt_Prev = require('../../pages/api/socket/prev')
const spt_Next = require('../../pages/api/socket/next')

async function SpotifyMain(app, root, io) {
  // Auth
  app.get('/api/auth/login', async (req, res) => {
    await AuthIn(req, res, sAPI)
  })

  app.get('/api/auth/callback', async (req, res) => {
    await AuthCallback(req, res, sAPI)
  })

  app.get('/api/auth/logout', async (req, res) => {
    req.session.destroy()
    res.redirect('/')
  })
}

module.exports = SpotifyMain
