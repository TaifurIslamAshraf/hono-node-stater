import { Hono } from 'hono';
import { serveInternalServerError, serveNotFound } from '../errorHandlers/error';
import userRoutes from '../modules/users-managment/user/user.route';

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes,
    },
];

export function configureRoutes(app: Hono) {
    // Index path
    app.get('/', (c) => {
        return c.text('Ok');
    });

    // Universal catchall
    app.notFound((c) => {
        return serveNotFound(c);
    });

    // Error handling
    app.onError((err, c) => {
        return serveInternalServerError(c, err);
    });

    moduleRoutes.forEach((route) => app.route(`/api/v1${route.path}`, route.route));
}
