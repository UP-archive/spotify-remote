const session = require('express-session')

async function Middleware(app, exp) {
  app.use(
    session({
      secret: 'dethzMastery198',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  )
}

module.exports = Middleware
