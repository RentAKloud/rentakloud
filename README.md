## Deployment Setup

Make sure following packages are installed:

- curl
- nodejs + npm (either install using `apt` or nvm as instructed on official site)
- yarn (`npm install -g yarn`)
- docker ([Docker Engine Official Installation Instructions](https://docs.docker.com/engine/install/debian/))
- pm2 (`npm install pm2@latest -g`)

Make sure following directories exist:

- /www/{web,docker,api,admin}

Set proper ownerships
`chown -R <user>:<user> /www`

## Troubleshooting

### Docker

- `failed to create shim task: OCI runtime create failed: runc create failed...bpf_prog_query(BPF_CGROUP_DEVICE) failed: invalid argument: unknown`

See: https://github.com/docker/cli/issues/4273
For Debian, appending `systemd.unified_cgroup_hierarchy=0` to `GRUB_CMDLINE_LINUX_DEFAULT` in `/etc/default/grub` fixed it.