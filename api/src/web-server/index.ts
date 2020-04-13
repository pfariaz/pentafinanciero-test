/* istanbul ignore file */
import * as express from 'express';
import * as logger from 'morgan';
import * as config from 'config';
import routes from './routes';
import { application } from '../application';
import { Server } from 'http';
import * as swagger from 'swagger-ui-express';
import * as cors from 'cors';

export const app = express();

if (config.util.getEnv('NODE_CONFIG_ENV') !== 'test') {
  app.use(
    logger(
      config.get('server.logFormat'),
      { skip: req => (req.baseUrl || req.originalUrl).includes('healthcheck') }
    )
  );
}

try {
  const swaggerDocument = require('../../swagger.json');
  app.use('/api/docs', swagger.serve, swagger.setup(swaggerDocument));
} catch (err) {
  console.log('Unable to load swagger.json', err);
}

app.use(cors());
app.use(config.get('server.baseUrl'), routes);

export let server: Server;

const start = () => new Promise((resolve, reject) => {
  server = app.listen(config.get('server.port'), () => {
      resolve('Express Server started');
  }).on('error', (error: Error) => {
    reject(error);
  });
});
const stop = () => new Promise((resolve, reject) => {
  server.close((error: Error) => {
    if (error) {
      reject(error);
    } else {
      resolve('Express Server stopped');
    }
  });
});

application.onStart(() => {
  start()
    .then(message => console.log(message))
    .then(() => console.log(`${config.get('appName')} started!`))
    .catch((error: Error) => {
      console.error(error);
      application.shutdown();
    });
});
application.onShutdown(() => stop());

export { start, stop };
