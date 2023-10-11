const DateLine = require('./modules/date')

async function SocketWare(Server, server) {
  const io = new Server(server)

  io.on('connection', (socket) => {
    console.log('')
    console.log('| Socket connected' + DateLine)
  })
}

module.exports = SocketWare
