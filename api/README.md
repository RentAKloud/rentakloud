## Installation

```bash
$ yarn install
```

## Running the app

You can easily launch database (and other services) using Docker:

```
cd docker/
docker compose --env-file ../api/.env up -d
```

Next you'll need to create the required databases. It can be done using the Adminer Web UI available at localhost:9000, or you can CLI into the docker container and do it there. The required database names are:

- rentakloud
- glitchtip

Next run the migrations (see Database section for commands), and optionally seed the db. Then you should be able to start the project:

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Database

### Run Migrations

```
npx prisma migrate deploy
```

### Seeding

To manually seed database, use `prisma db seed`. It uses the command specified in `package.json`

`prisma migrate reset` automatically runs seeding using `prisma/seed.ts`. Use `--skip-seed` to skip seeding with these commands.

### Updating the Schema

Go to `prisma/schema.prisma` and add/update the models.

### Generate Migrations

Generates and runs the migration.

```
npx prisma migrate dev --name <migration-name>
```

Add `--create-only` to only generate and not run. Then you can edit it, and run separately: `npx prisma db execute --file ./<migration_name>.sql --schema prisma/schema.prisma`

### Rollback

For rollback you have to separately generate down migrations. I prefer resetting the database, although it results in data loss.

```
npx prisma migrate reset
```

### Updating the Models

To reflect your latest changes in schema in the code, you need to update the prisma client. This happens automatically on migration.

```
npx prisma generate
```
