import { Worker } from 'bullmq';
import { Hono } from 'hono';
import { serveInternalServerError, serveNotFound } from '../errorHandlers/error';

let worker: Worker | undefined;

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

    const api = app.basePath('/v1');

    // Setup repos
    // const userRepo = new UserRepository();

    // Setup services
    // const userService = new UserService(userRepo);

    // Setup controllers
    // const authController = new AuthController(userService);

    // Register routes
    // registerUserRoutes(api, authController);
}

// function registerUserRoutes(api: Hono, authCtrl: AuthController) {
//     const user = new Hono();
//     const authCheck = jwt({ secret: env.SECRET_KEY });

//     user.get('/me', authCheck, authCtrl.me);
//     user.post('/login', loginValidator, authCtrl.login);
//     user.post('/register', registrationValidator, authCtrl.register);

//     api.route('/user', user);
// }
