# Hono Starter

A hono starter boilerplate for TypeScript with minimal dependencies and clean architecture. All dependencies are
initiated at the start of the application and passed to the controllers and services.

## Stack

- Authentication: JWT
- Validation: Zod
- Worker: BullMQ
- Logging: Pino
- ORM: Drizzle
- Queue: Redis
- DB: PostgresSql
- Runtime: NodeJS
- Framework: Hono
- Formatter: Prettier
- Language: TypeScript
- Package Manager: Bun

## Install dependencies

```bash
bun add
bun add -g pino-pretty
```

## Run the app

Create a new file `.env` in the root folder and copy contents from the `.env.template` file.

```bash
docker compose up -d
bun run dev
```

```bash
open http://localhost:3000
```

## Migration

### Generate

```bash
bun run db:generate
```

### Migrate

```bash
bun run db:migrate
```

### Drop

```bash
bun run db:drop
```

## License

MIT
