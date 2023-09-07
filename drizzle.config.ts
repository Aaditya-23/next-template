import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'
dotenv.config()

export default {
  schema: './database/schema/index.ts',
  out: './database/drizzle',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config
