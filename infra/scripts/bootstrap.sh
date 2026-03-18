#!/usr/bin/env bash
set -euo pipefail
cp .env.example .env || true
printf "Bootstrap complete. Install dependencies with pnpm install.
"
