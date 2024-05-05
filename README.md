## Deployment Setup

Make sure following packages are installed:

- curl
- nodejs + npm (either install using `apt` or nvm as instructed on official site)
- yarn (`npm install -g yarn`)
- docker ([Docker Engine Official Installation Instructions](https://docs.docker.com/engine/install/debian/))
- pm2 (`npm install pm2@latest -g`)

Make sure following directories exist with proper owner

- /www/{web,docker,api,admin}