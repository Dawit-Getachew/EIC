#!/usr/bin/env node

/**
 * Module dependencies.
 */
import http from 'http'
import { ApolloServer } from 'apollo-server-express';
import { Print } from "../Helpers/Print";
import app from "../app";
import { Connect } from '../Connections';
const debug = require('debug')('api-gateway-service:server');
import schema from "./schema"

/**
 * Get port from environment and store in Express.
 */

const PORT = normalizePort(process.env.PORT || '3000');
app.set('port', PORT);


/**
     * Create HTTP server.
     */
const httpServer = http.createServer(app);
async function startServer() {

  //connect to database
  Connect.database();

  const server = new ApolloServer({
    schema,
    context: (request: any, response: any) => ({ request, response }),
    introspection: true,
    playground: true,

  });
  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer)

  server.applyMiddleware({ app, path: "/graphql", cors: false });

  // catch 404 and forward to error handler
  app.use(function (request, response, next) {
    response.status(404).json({ error: "Page not found." });
  });

  httpServer.on('error', onError);
  httpServer.on('listening', onListening);
  httpServer.listen(
    { port: PORT },
    (): void => {
      // tslint:disable-next-line: no-console
      console.log(`\n🚀 GraphQL is now running on http://localhost:${PORT}/graphql`)
    }
  )

}

startServer();


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
  * Event listener for HTTP server "error" event.
  */

function onError(error: { syscall: string; code: any; }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ?
    'Pipe ' + PORT :
    'Port ' + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = httpServer.address();
  const bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr?.port;
  debug('Listening on ' + bind);
  Print.active(`server is running on port ${PORT}...`);
}

