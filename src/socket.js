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

  app.post('/api/controller/play', async (req, res) => {
    io.emit('controller', 'play')

    res.send({
      msg: `State: Play Toggle Send!`,
    })
  })

  app.post('/api/controller/next', async (req, res) => {
    io.emit('controller', 'next')

    res.send({
      msg: `State: Next Send!`,
    })
  })

  app.post('/api/controller/prev', async (req, res) => {
    io.emit('controller', 'prev')

    res.send({
      msg: `State: Previous Send!`,
    })
  })
}

module.exports = SocketWare
