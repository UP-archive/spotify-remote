const { AuthIn, AuthCallback } = require('./auth')
const sAPI = require('./client')
const DateLine = require('../date')

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

  // // Play
  // app.get('/api/controller/play', async (req, res) => {
  //   io.timeout(5000).emit('spotify_play', (err, response) => {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       console.log(`| ${DateLine} -- ${response}`)
  //       res.send(response)
  //     }
  //   })
  // })

  // // Previous
  // app.get('/api/controller/prev', async (req, res) => {
  //   io.timeout(5000).emit('spotify_prev', (err, response) => {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       console.log(`| ${DateLine} -- ${response}`)
  //       res.send(response)
  //     }
  //   })
  // })

  // // Next
  // app.get('/api/controller/next', async (req, res) => {
  //   io.timeout(5000).emit('spotify_next', (err, response) => {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       console.log(`| ${DateLine} -- ${response}`)
  //       res.send(response)
  //     }
  //   })
  // })
}

module.exports = SpotifyMain
