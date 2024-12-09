import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(DATABASE_URL);
export const db = drizzle(sql, { schema });

export async function queryDb<T>(query: Promise<T>): Promise<T> {
  try {
    return await query;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Database operation failed. Please try again later.');
  }
}

export async function checkConnection() {
  try {
    await sql`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

export { sql as migrationClient };