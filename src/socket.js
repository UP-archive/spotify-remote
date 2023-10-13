const DateLine = require('./modules/date')

async function SocketWare(Server, server) {
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
}

module.exports = SocketWare
