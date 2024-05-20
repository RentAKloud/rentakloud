## Installation

```bash
$ yarn install
```

## Running the app

### Setting Up The Environment

Make sure you have `.env` file.

You can easily launch the database and other services using Docker:

```
cd docker/
docker compose --env-file ../api/.env up -d
```

Next you'll need to create the required databases. It can be done using the Adminer Web UI available at localhost:9000, or you can CLI into the docker container and do it there. The required database names are:

- rentakloud

Next run the migrations (see Database section for commands), and optionally seed the db.

### Start The App

Now you should be able to start the project:

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

For rollback you have to separately [generate down migrations](https://www.prisma.io/docs/guides/migrate/developing-with-prisma-migrate/generating-down-migrations). **You have to do this before generating _up_ migrations**.

```
npx prisma migrate diff \
 --from-schema-datamodel prisma/schema.prisma \
 --to-schema-datasource prisma/schema.prisma \
 --script > down.sql
 ```

 For failed migration, you would also need to run:

```
npx prisma migrate resolve --rolled-back <migration-name>
```

Sometimes, resetting the database is easier, although it results in data loss.

```
npx prisma migrate reset
```

### Updating the Models

To reflect your latest changes in schema in the code, you need to update the prisma client. This happens automatically on `migrate dev`.

```
npx prisma generate
```

### Manual Imports/Exports

In case you import some data manually using a dump file, you'll also need to set AUTOINCREMENT counter/sequence for some tables such as `User` or `Product`. To do so:

```sql
SELECT setval(pg_get_serial_sequence('"table_name"','id'), coalesce(max("id"), 1), max("id") IS NOT null) FROM "table_name"
```