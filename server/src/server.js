import 'dotenv/config';
import app from './app.js';
import { connectDatabase } from './config/database.js';

const port = Number(process.env.PORT || 4000);
try {
  globalThis.mongoReady = await connectDatabase();
  if (!globalThis.mongoReady) console.info('MongoDB not configured; using in-memory demo persistence');
} catch (error) {
  if (process.env.NODE_ENV === 'production') {
    console.error(`MongoDB connection is required in production: ${error.message}`);
    process.exit(1);
  }
  console.warn(`MongoDB unavailable (${error.message}); using in-memory demo persistence`);
  globalThis.mongoReady = false;
}
if (process.env.NODE_ENV === 'production' && !globalThis.mongoReady) {
  console.error('MONGODB_URI is required in production.');
  process.exit(1);
}
app.listen(port, () => console.info(`AI Mystery Room API listening on http://localhost:${port}`));
