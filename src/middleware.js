const session = require('express-session')

async function Middleware(app, exp) {
  app.use(
    session({
      secret: 'dethzMastery198',
      saveUninitialized: false,
    })
  )
}

module.exports = Middleware
