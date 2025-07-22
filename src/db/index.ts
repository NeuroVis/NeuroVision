import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from 'dotenv';

config();


const db = drizzle(process.env.DATABASE_URL!);

export default db;