#!/usr/bin/env bash
# set -x

USER="jimmychu"
REMOTE="hackernews.app.hkwtf.com"
APP_PATH="/var/www/hackernews-www"
DEPLOY_PATH="${APP_PATH}/public"

# Remove the destination and setup again
ssh ${USER}@${REMOTE} "bash -lc \"rm -rf ${DEPLOY_PATH}/*\""

echo "Deploying to ${REMOTE}..."
rsync -av build/ ${USER}@${REMOTE}:$DEPLOY_PATH
