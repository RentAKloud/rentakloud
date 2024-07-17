## Development

In development use the following to setup the runtime environment for API and other tools:

```
cd docker/
docker compose --env-file ../api/.env up -d
```

## Production

In production use the following:

```
cd docker/
docker compose --env-file ../api/.env -f docker-compose.yml -f docker-compose.prod.yml up -d
```
