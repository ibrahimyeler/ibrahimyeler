#!/usr/bin/env bash
set -Eeuo pipefail
umask 077
[[ $# == 1 && $1 =~ ^[0-9a-f]{40}$ ]] || { echo 'Invalid commit'; exit 64; }
revision=$1
root=/opt/ibrahimyeler-portfolio
repository="$root/source.git"
exec 9>"$root/deploy.lock"
flock -w 1200 9
candidate="iy-portfolio-check-${revision:0:12}"
release="$root/releases/$revision"
image="ibrahimyeler-portfolio-web:$revision"
activated=0
previous=$(mktemp "$root/previous.XXXXXX")
cp "$root/current.env" "$previous"
compose=(docker compose --env-file "$root/current.env" -f "$root/compose.production.yml")
cleanup() {
  result=$?
  trap - EXIT
  docker rm -f "$candidate" >/dev/null 2>&1 || true
  if (( result != 0 && activated == 1 )); then
    echo 'Deployment failed; restoring previous image.' >&2
    cp "$previous" "$root/current.env"
    "${compose[@]}" up -d --no-build --pull never --wait --wait-timeout 90 || echo 'ROLLBACK FAILED: operator intervention required' >&2
  fi
  rm -f "$previous"
  exit "$result"
}
trap cleanup EXIT
if [[ ! -d $repository ]]; then
  git init --bare "$repository"
  git --git-dir="$repository" remote add origin https://github.com/ibrahimyeler/ibrahimyeler.git
fi
fetch_main() {
  git --git-dir="$repository" fetch --depth=1 origin +refs/heads/main:refs/remotes/origin/main
}
fetch_main
if [[ $(git --git-dir="$repository" rev-parse refs/remotes/origin/main) != "$revision" ]]; then
  echo 'A newer main commit exists; this outdated deployment is skipped.'
  exit 0
fi
mkdir -p "$release"
git --git-dir="$repository" archive "$revision" | tar -xf - -C "$release"
cat > "$root/build.compose.yml" <<BUILD
services:
  web:
    image: $image
    build:
      context: $release
      dockerfile: Dockerfile.production
BUILD
docker compose --progress plain -p iy-portfolio-build -f "$root/build.compose.yml" build web
docker run -d --name "$candidate" --network none "$image"
ready=0
for attempt in {1..30}; do
  if docker exec "$candidate" node -e "fetch('http://127.0.0.1:3000').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))" >/dev/null 2>&1; then
    ready=1
    break
  fi
  sleep 2
done
if (( ready != 1 )); then
  docker logs --tail 40 "$candidate"
  echo 'Candidate health check failed; live site unchanged.' >&2
  exit 1
fi
docker rm -f "$candidate" >/dev/null
fetch_main
if [[ $(git --git-dir="$repository" rev-parse refs/remotes/origin/main) != "$revision" ]]; then
  echo 'Main changed during the build; a newer run will deploy it.'
  exit 0
fi
printf 'PORTFOLIO_IMAGE=%s\n' "$image" > "$root/current.env.next"
mv "$root/current.env.next" "$root/current.env"
activated=1
"${compose[@]}" up -d --no-build --pull never --wait --wait-timeout 90
curl --fail --silent --show-error --retry 5 --retry-all-errors --retry-delay 2 --max-time 15   --resolve ibrahimyeler.com:443:127.0.0.1 https://ibrahimyeler.com/ -o /dev/null
printf '%s\n' "$revision" > "$root/DEPLOYED_COMMIT"
activated=0
printf 'Successfully deployed %s\n' "$revision"
