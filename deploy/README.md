# Production deployment

The `main` branch of **ibrahimyeler/ibrahimyeler** deploys automatically to
https://ibrahimyeler.com and https://www.ibrahimyeler.com through GitHub Actions.
A local commit alone does not deploy: push to `main` or merge a PR into it.
The workflow can also be started manually from Actions → Deploy portfolio.

## Flow

1. GitHub installs the lockfile dependencies, checks types and builds the site.
2. A dedicated SSH key calls only `deploy <commit SHA>` on the server.
3. The server locks concurrent runs and fetches the public repository. It accepts
   only the current `main` commit, skipping superseded runs.
4. It builds a commit-tagged Docker image and checks a separate temporary container.
5. It switches the portfolio service to the tested image, checks health and HTTPS,
   and restores the previous image automatically if activation fails.

The service switch briefly recreates its container; this is not a zero-downtime
blue/green deployment. A failing build leaves the running service untouched.
No API, admin or other application containers are redeployed.

## Configuration

Repository Actions variables: `DEPLOY_HOST`, `DEPLOY_USER`.
Actions secrets: `DEPLOY_SSH_KEY`, `DEPLOY_KNOWN_HOSTS`.
The SSH host key is pinned; credentials must never be committed.
The dedicated `portfolio-deploy` account has a forced SSH command and permission
only to invoke the root-owned deployment script. It has no general Docker access.

Server location: `/opt/ibrahimyeler-portfolio`.
- `compose.production.yml`: installed copy of this directory's Compose file.
- `current.env`: active `PORTFOLIO_IMAGE`, owned by root.
- `DEPLOYED_COMMIT`: last successfully deployed Git revision.
- `source.git`: read-only public source fetch cache.
- `releases/<SHA>`: source used for each build.
- `/usr/local/bin/iy-portfolio-ssh`: installed `ssh-entrypoint.sh`.
- `/usr/local/sbin/iy-portfolio-deploy`: installed `server-deploy.sh`.

Deployment script and Compose changes require an operator to install their new
versions on the server. Application and Dockerfile changes deploy from `main`.
Images and releases are retained for rollback; monitor disk use periodically.

## Roll back

Prefer reverting the faulty change in Git and pushing the revert to `main`.
For an emergency rollback, an operator can set `PORTFOLIO_IMAGE` in `current.env`
to a previously built `ibrahimyeler-portfolio-web:<SHA>`, then run:

```sh
docker compose --env-file /opt/ibrahimyeler-portfolio/current.env \
  -f /opt/ibrahimyeler-portfolio/compose.production.yml \
  up -d --no-build --pull never --wait
```

Update `DEPLOYED_COMMIT` to the restored revision after verifying the website.
Never prune the active or previous working image during deployment.
