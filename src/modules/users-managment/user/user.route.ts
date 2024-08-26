import { Hono } from 'hono';
import { middleware } from '../../../middlewares/test';
import { userValidator } from '../../../validators/user';
import { userControllers } from './user.controller';

const userRoutes = new Hono();

userRoutes.post('/register', userValidator.registerValidator, middleware, userControllers.createUser);
userRoutes.get('/all', userControllers.getAllUsers);

export default userRoutes;
