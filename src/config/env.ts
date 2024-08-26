import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
    PORT: z.string().default('3000'),
    LOG_LEVEL: z.string().default('info'),
    NODE_ENV: z.enum(['development', 'production']).default('development'),

    ORIGIN: z.string().default('http://localhost:3000,http://localhost:3001'),

    SECRET_KEY: z.string(),

    DB_HOST: z.string().default('localhost'),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    DB_PORT: z.string().default('5432'),
    DATABASE_URL: z.string().url(),

    REDIS_HOST: z.string().default('localhost'),
    REDIS_PORT: z.string().default('6379'),
});

export default envSchema.parse(process.env);
