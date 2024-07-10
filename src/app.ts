import createError from 'http-errors';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import http from 'http';
import cors from 'cors';


dotenv.config({ path: path.join(__dirname, '../.env') });
import { handleError } from './middlewares/error-handler';
import httpLogger from './middlewares/httpLogger';
import router from './routes/index';
import ApiRoutes from './app_api/routes/index';
import env from './config/env';
import corsOptions from './config/cors-options';


/**DB Connection */
import("./config/db");

const app: express.Application = express();

const port = env.PORT || '8000';
app.set('port', port);

const server = http.createServer(app);

app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Enable CORS
app.use(cors(corsOptions));


app.use('/', router);
/**API server */
app.use('/api', ApiRoutes);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

console.log("++++++++++++++++++++++++++++++++++BEFORE ERROR HANDLER+++++++++++++++++++++++++++++++++++++++++++")
// error handler
app.use(handleError);
console.log("++++++++++++++++++++++++++++++++++AFTER ERROR HANDLER+++++++++++++++++++++++++++++++++++++++++++")


function onError(error: { syscall: string; code: string }) {
  console.log("error$$$ ", error)
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  console.info(`Server is listening on ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
