import { createMiddleware } from 'hono/factory';
import { TRACING } from '../libs/constants';
import { randomString } from '../utils/string';

export const tracing = createMiddleware(async (c, next) => {
    c.set(TRACING, randomString(10));
    await next();
});
