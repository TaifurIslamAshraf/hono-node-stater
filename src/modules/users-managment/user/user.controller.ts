import { Hono } from 'hono';
import { logger } from '../../../config/logger';
import sendResponse from '../../../utils/resp';
import { middleware } from './user.middleware';
import { userServices } from './user.service';

const userRoutes = new Hono();

userRoutes.get('/', middleware, async (c) => {
    try {
        const result = await userServices.findAllUserFromdb();

        return sendResponse(c, {
            statusCode: 200,
            data: result,
            message: 'User Get successfully',
        });
    } catch (error) {
        logger.error(error);
    }
});

userRoutes.get('/:id', async (c) => {
    try {
        const result = c.req.param('id');
        return sendResponse(c, {
            statusCode: 200,
            data: result,
            message: 'User Get successfully',
        });
    } catch (error) {
        logger.error(error);
    }
});

export default userRoutes;
