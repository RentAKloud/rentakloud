## Installation

```bash
$ yarn install
```

## Running the app

### Database

You can easily launch database using Docker:

```
docker compose up
```

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Database

### Updating the Schema

Go to `prisma/schema.prisma` and add/update the models.

### Generate Migrations

Generates and runs the migration.

```
npx prisma migrate dev --name <migration-name>
```

Add `--create-only` to only generate and not run. Then you can edit it, and run separately: `npx prisma db execute --file ./<migration_name>.sql --schema prisma/schema.prisma`

### Seeding

`prisma migrate reset` automatically run seed using `prisma/seed.ts`. Use `--skip-seed` to skip seeding with these commands.

To manually seed database, use `prisma db seed`. It uses the command specified in `package.json`

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
