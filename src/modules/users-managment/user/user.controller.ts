import { eq } from 'drizzle-orm';
import { Context } from 'hono';
import { logger } from '../../../config/logger';
import { db } from '../../../db';
import { user } from '../../../db/schema';
import { serveConflict, serveNotFound } from '../../../errorHandlers/error';
import sendResponse from '../../../utils/resp';
import { RegistrationBody } from '../../../validators/user';
import { userServices } from './user.service';

const createUser = async (c: Context) => {
    try {
        const { fullName, age, email, password } = (await c.req.json()) as RegistrationBody;

        //check email exist
        const isEmailExist = await db.select().from(user).where(eq(user.email, email)).limit(1);

        if (isEmailExist.length > 0) {
            return serveConflict(c, 'Email already exists');
        }

        const payload: RegistrationBody = {
            fullName,
            age,
            email,
            password,
        };

        const result = await userServices.createUserIntodb(payload);

        return sendResponse(c, {
            statusCode: 200,
            data: result,
            message: 'User create successfully',
        });
    } catch (error) {
        logger.error(error);
    }
};

const getAllUsers = async (c: Context) => {
    try {
        const result = await userServices.getAllUsersFromdb();
        if (!result) {
            return serveNotFound(c);
        }

        return sendResponse(c, {
            statusCode: 200,
            data: result,
            message: 'User create successfully',
        });
    } catch (error) {
        logger.error(error);
    }
};

export const userControllers = { createUser, getAllUsers };
