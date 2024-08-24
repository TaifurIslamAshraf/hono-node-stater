import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';
import config from '../../drizzle.config';
import env from '../config/env';
import { logger } from '../config/logger';
const { Pool } = pg;

const pool = new Pool({
    connectionString: env.DATABASE_URL,
});

const db = drizzle(pool);

async function main() {
    if (config.out) {
        await migrate(db, { migrationsFolder: config.out });
        logger.info('Migration done!');
    }
}

main()
    .catch((err) => {
        logger.error(err);
    })
    .finally(async () => {
        await pool.end();
    });
