const exp = require('express')
const app = exp()
const http = require('http').createServer(app)
const { Server } = require('socket.io')
require('dotenv').config()

const Routes = require('./src/routes')
const Serve = require('./src/serve')
const Middleware = require('./src/middleware')
const SocketWare = require('./src/socket')

Middleware(app, exp)
Routes(app, __dirname)
Serve(http)

SocketWare(Server, http)
