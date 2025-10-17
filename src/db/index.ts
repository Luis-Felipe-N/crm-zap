import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  throw new Error('A variável de ambiente DATABASE_URL não está definida.');
}

const connectionString = process.env.DATABASE_URL;

export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);
