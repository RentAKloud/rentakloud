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

Go to `prisma/schema.prisma` and update the models.

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

To reflect your latest changes in schema in the code, you need to update the prisma client.

```
npx prisma generate
```
