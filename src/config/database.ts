import mongoose from 'mongoose';
import env from './env';
import { logger } from './logger';

export const connectDB = () => {
    mongoose
        .connect(env.DATABASE_URL)
        .then(() => {
            logger.info('Database is Connected ✨');
        })
        .catch((err) => {
            logger.error(err);
        });
};
