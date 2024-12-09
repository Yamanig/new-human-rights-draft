import { migrate } from 'drizzle-orm/neon-http/migrator';
import { db, migrationClient, checkConnection } from './index';

async function runMigration() {
  try {
    // Check connection first
    const isConnected = await checkConnection();
    if (!isConnected) {
      throw new Error('Unable to establish database connection');
    }

    // Run migrations
    await migrate(db, { migrationsFolder: 'drizzle' });
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Error running migration:', error);
    process.exit(1);
  } finally {
    // Close connection
    await migrationClient.end();
  }
}

runMigration();