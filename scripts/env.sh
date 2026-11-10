#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: scripts/env.sh {up|down|status} {local|preview|int|uat|prod-sim}" >&2
  exit 2
}

[[ $# -eq 2 ]] || usage
action=$1
environment=$2
case "$environment" in
  local|preview|int|uat|prod-sim) ;;
  *) usage ;;
esac
case "$action" in
  up|down|status) ;;
  *) usage ;;
esac

root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
env_file="$root/environments/$environment.env"
secrets_file="$root/environments/$environment.secrets.env"
compose_file="$root/environments/compose.yml"
compose=(docker compose --env-file "$env_file")
if [[ -f "$secrets_file" ]]; then
  compose+=(--env-file "$secrets_file")
fi
compose+=(-f "$compose_file" -p "parimi-$environment")

case "$action" in
  up)
    "${compose[@]}" up -d
    port=$(sed -n 's/^HOST_PORT=//p' "$env_file")
    url="http://127.0.0.1:${port}/api/health"
    for ((attempt=1; attempt<=60; attempt++)); do
      if node -e 'fetch(process.argv[1]).then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))' "$url"; then
        echo "$environment is healthy at $url"
        exit 0
      fi
      sleep 2
    done
    echo "Timed out waiting for $url" >&2
    "${compose[@]}" logs --no-color app >&2
    exit 1
    ;;
  down)
    "${compose[@]}" down
    ;;
  status)
    "${compose[@]}" ps
    ;;
esac
