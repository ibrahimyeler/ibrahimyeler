#!/usr/bin/env bash
set -euo pipefail
if [[ ${SSH_ORIGINAL_COMMAND:-} =~ ^deploy\ ([0-9a-f]{40})$ ]]; then
  exec sudo -n /usr/local/sbin/iy-portfolio-deploy "${BASH_REMATCH[1]}"
fi
printf '%s\n' 'Only deploy <40-character commit SHA> is allowed.' >&2
exit 64
