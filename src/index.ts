import env from './config/env';

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { compress } from 'hono/compress';
import { cors } from 'hono/cors';
import { showRoutes } from 'hono/dev';
import { logger as httpLogger } from 'hono/logger';
import { trimTrailingSlash } from 'hono/trailing-slash';

import { logger } from './config/logger';
import { NODE_ENVIRONMENTS } from './libs/constants';
import { tracing } from './middlewares/tracing';
import { configureRoutes, shutDownWorker } from './routes';

const app = new Hono();

// Generic middlewares
app.use(cors());
app.use(tracing);
app.use(compress());
app.use(httpLogger());
app.use(trimTrailingSlash());

console.log(env.DATABASE_URL);
//configur all routes
configureRoutes(app);

if (env.NODE_ENV === NODE_ENVIRONMENTS.development) {
    console.log('Available routes:');
    showRoutes(app);
}

const port = parseInt(env.PORT);
logger.info(`Server is running on port: ${port}, env: ${env.NODE_ENV}`);
const server = serve({ fetch: app.fetch, port });

process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received');

    logger.info('Closing http server');
    server.close(async () => {
        logger.info('Closing worker');
        await shutDownWorker();

        logger.info('Exiting...');
        process.exit(0);
    });
});
