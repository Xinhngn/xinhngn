#!/bin/bash
# Chỉ chạy trên máy cloud (Claude Code trên web); máy cá nhân bỏ qua. Chạy lại nhiều lần vẫn an toàn.
set -euo pipefail
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then exit 0; fi
cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"
export DO_NOT_TRACK=1 CODEGRAPH_TELEMETRY=0
echo 'export DO_NOT_TRACK=1' >> "${CLAUDE_ENV_FILE:-/dev/null}"

# Không để lỗi mạng (VD kho npm bị chặn) làm hỏng cả phiên: báo rồi đi tiếp.
npm install --no-audit --no-fund --loglevel=error || echo "[session-start] npm install lỗi (mạng?), bỏ qua"

if ! command -v codegraph >/dev/null 2>&1; then
  npm i -g @colbymchenry/codegraph --no-audit --no-fund --loglevel=error || echo "[session-start] bỏ qua CodeGraph"
fi
if command -v codegraph >/dev/null 2>&1; then
  if [ -d .codegraph ]; then codegraph sync >/dev/null 2>&1 || codegraph index >/dev/null 2>&1 || true
  else codegraph init >/dev/null 2>&1 || true; fi
fi
exit 0
