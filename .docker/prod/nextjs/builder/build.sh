#!/usr/bin/env bash
######## BUILD ARGUMENTS###########
#>>>> PLATFORM_ENVIRONMENT
#>>>> MEDUNES_VERSION
#>>>> MEDUNES_BUILD_TIME
###################################


parseEnv() {
  echo "started building using:"
  PLATFORM_ENVIRONMENT=$PLATFORM_ENVIRONMENT
  MEDUNES_VERSION=$MEDUNES_VERSION
  MEDUNES_BUILD_TIME=${MEDUNES_BUILD_TIME}

  cp "/app/.env.${PLATFORM_ENVIRONMENT}" "/app/.env.production"
  sed -i "s/__MEDUNES_VERSION__/${MEDUNES_VERSION}/g" "/app/.env.production"
  sed -i "s/__MEDUNES_BUILD_TIME__/${MEDUNES_BUILD_TIME}/g" "/app/.env.production"
}

installApplication() {
  cd /app
  corepack yarn install
  corepack yarn run build


}

buildPackage() {
  cd ..
  tar -zcvf "app.tar.gz" -C app .
  rm -rf /app
  ls -lah "app.tar.gz"
}

parseEnv
installApplication
buildPackage