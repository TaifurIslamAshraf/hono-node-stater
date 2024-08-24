import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
    PORT: z.string().default('4000'),
    LOG_LEVEL: z.string().default('info'),
    NODE_ENV: z.enum(['development', 'production']).default('development'),

    DATABASE_URL: z.string().url(),
    REDIS_HOST: z.string().default('localhost'),
    REDIS_PORT: z.string().default('6379'),
});

export default envSchema.parse(process.env);
