import { eq } from 'drizzle-orm/expressions';
import { Context } from 'hono';
import { db } from '../../../db';
import { user } from '../../../db/schema';
import { serveConflict } from '../../../errorHandlers/error';
import { RegistrationBody } from '../../../validators/user';

const createUserIntodb = async (payload: RegistrationBody) => {
    const newUser = await db.insert(user).values(payload).returning();

    return newUser;
};
const getAllUsersFromdb = async () => {
    const users = await db.select().from(user);

    return users;
};

// Check if email exists in the database
const isEmailExist = async (c: Context) => {
    const { email } = await c.req.json();

    const result = await db.select().from(user).where(eq(user.email, email)).limit(1);
    console.log(result);
    if (result.length > 0) {
        return serveConflict(c, 'Email already exists');
    }
};

export const userServices = { createUserIntodb, isEmailExist, getAllUsersFromdb };
