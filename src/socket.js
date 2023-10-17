const DateLine = require('./modules/date')

async function SocketWare(Server, server, app) {
  const io = new Server(server)

  io.on('connection', (socket) => {
    console.log('')
    console.log('| User connected -- ' + DateLine)

    socket.on('disconnect', () => {
      console.log('')
      console.log('| User Disconnected -- ' + DateLine)
    })

    socket.on('controller', (state) => {
      console.log(`| ${DateLine} -- ${state}`)
      io.emit('controller', state)
    })
  })

  app.post('/api/controller/:slug', async (req, res) => {
    const state = req.params.slug

    io.emit('controller', state)
    console.log('| socket send command "' + state + '" -- ' + DateLine)

    res.send({
      msg: `State: ${state} Send!`,
    })

    console.log(state)
  })
}

module.exports = SocketWare
