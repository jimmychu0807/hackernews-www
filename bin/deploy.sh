#!/usr/bin/env bash
# set -x

# TP1 & TP2
USER="jimmychu"
REMOTE="hackernews.app.hkwtf.com"
APP_PATH="/var/www/hackernews-www"
DEPLOY_PATH="${APP_PATH}/public"

# Remove the destination and setup again
ssh ${USER}@${REMOTE} "bash -lc \"rm -rf ${DEPLOY_PATH}/*\""

echo "Deploying to ${REMOTE}..."
rsync -av build/ ${USER}@${REMOTE}:$DEPLOY_PATH
