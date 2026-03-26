import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
	schema: "./src/db/schemas/index.ts",
	out: "./src/db/migrations",
	casing: "snake_case",
});
