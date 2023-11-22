#!/usr/bin/env bash
######## BUILD ARGUMENTS###########
#>>>> PLATFORM_ENVIRONMENT
#>>>> MEDUNES_VERSION
#>>>> MEDUNES_BUILD_TIME
#>>>> GITHUB_ID
#>>>> GITHUB_SECRET
#>>>> NEXTAUTH_SECRET
###################################

parseEnv() {
  echo "started building using:"
  printf "PLATFORM_ENVIRONMENT=$PLATFORM_ENVIRONMENT\n"
  printf "MEDUNES_VERSION=$MEDUNES_VERSION\n"
  printf "MEDUNES_BUILD_TIME=${MEDUNES_BUILD_TIME}\n"
  printf "GITHUB_ID=${GITHUB_ID}\n"
  printf "GITHUB_SECRET=${GITHUB_SECRET}\n"
  printf "NEXTAUTH_SECRET=${NEXTAUTH_SECRET}\n"

  cp "/app/.env.${PLATFORM_ENVIRONMENT}" "/app/.env.production"
  sed -i "s/__MEDUNES_VERSION__/${MEDUNES_VERSION}/g" "/app/.env.production"
  sed -i "s/__MEDUNES_BUILD_TIME__/${MEDUNES_BUILD_TIME}/g" "/app/.env.production"
  sed -i "s/__GITHUB_ID__/${GITHUB_ID}/g" "/app/.env.production"
  sed -i "s/__GITHUB_SECRET__/${GITHUB_SECRET}/g" "/app/.env.production"
  sed -i "s/__NEXTAUTH_SECRET__/${NEXTAUTH_SECRET}/g" "/app/.env.production"

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