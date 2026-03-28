# Project Guidelines

## Architecture
- Monorepo with pnpm workspaces: api (Fastify + Drizzle + PostgreSQL) and web (React + Vite + TanStack Router).
- Backend exposes webhook capture and inspection routes; frontend is a separate app consuming backend endpoints.
- Keep changes scoped to one workspace when possible; if a change crosses api/web boundary, update both sides in the same PR.

## Build and Test
- Install dependencies from repo root: pnpm install
- Run backend dev server: cd api && pnpm run dev
- Run frontend dev server: cd web && pnpm run dev
- Build frontend: cd web && pnpm run build
- Root build (all workspaces): pnpm -r run build (or pnpm run build where applicable)
- Format code:
  - cd api && pnpm run format
  - cd web && pnpm run format
- Database workflow:
  - cd api && docker compose up -d
  - cd api && pnpm run db:generate
  - cd api && pnpm run db:migrate
- No test runner is configured yet. Do not invent test commands; if needed, propose adding a test setup first.

## Conventions
- Use TypeScript strict mode in both workspaces.
- API path alias @/* points to api/src/*.
- API routes follow Fastify plugin style with FastifyPluginAsyncZod and explicit schema definitions.
- Prefer deriving response schemas from Drizzle models when useful (drizzle-zod createSelectSchema).
- Keep database writes aligned with Drizzle table definitions (all not-null fields must be present in insert values).
- Web uses TanStack file-based routes; keep route definitions in web/src/routes and do not hand-edit generated routeTree.gen.ts.

## Code Style
- Biome is the source of truth for formatting/linting.
- Formatting differs by workspace:
  - api: spaces, width 80, single quotes, semicolons as needed
  - web: tabs, single quotes, semicolons as needed
- Organize imports (Biome assist action is enabled).

## Pitfalls
- README has useful setup context, but verify runtime defaults from code when they conflict.
- Backend default port comes from api/src/env.ts (PORT default is 3333).
- Ensure DATABASE_URL in api/.env matches api/docker-compose.yml credentials.

## References
- Project overview and setup: README.md
- API server wiring: api/src/server.ts
- Env contract: api/src/env.ts
- DB schema patterns: api/src/db/schemas/webhooks.ts
- Route patterns: api/src/routes/list-webhooks.ts
- Frontend app bootstrap: web/src/main.tsx
