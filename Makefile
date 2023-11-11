# set to 'prod' or 'dev' depending on the build type
# Ex: make ENV=prod build
GITLAB_NAMESPACE=dev.tn-developers.org:5050/software-engineering/devops/docker-images
COMPOSE_COMMAND := $$(which docker-compose ||  echo "docker compose")

ENV=dev
DOCKER_DIR=./.docker/${ENV}
include ./.docker/.auth
include ${DOCKER_DIR}/.env

PERSISTED_DATA_DIR=./.docker/${ENV}/data

# set this env when using the make build and make login commands
# Ex: make service=nginx login
# Ex: make service=mysql build
service=nextjs
gitlab-login:
	docker login dev.tn-developers.org:5050/software-engineering/devops/docker-images -u '${GITLAB_USER}' -p '${GITLAB_TOKEN}'
refresh:
	${COMPOSE_COMMAND} --env-file=${DOCKER_DIR}/.env -f ${DOCKER_DIR}/docker-compose.yml down
	$(MAKE) gitlab-login
	docker pull "${GITLAB_NAMESPACE}/medunes-node18-nextjs-${ENV}:latest"
build:
	mkdir -p "${PERSISTED_DATA_DIR}" && chmod -R 777 "${PERSISTED_DATA_DIR}"
	$(MAKE) gitlab-login
	MEDUNES_BUILD_TIME=$$(date +"%Y-%m-%d %H:%M:%S") ${COMPOSE_COMMAND} --env-file=${DOCKER_DIR}/.env -f ${DOCKER_DIR}/docker-compose.yml build --no-cache
	${COMPOSE_COMMAND} --env-file=${DOCKER_DIR}/.env -f ${DOCKER_DIR}/docker-compose.yml up -d
	${COMPOSE_COMMAND} --env-file=${DOCKER_DIR}/.env -f ${DOCKER_DIR}/docker-compose.yml  ps;
	#sleep 7
	$(MAKE) logs;
up:
	${COMPOSE_COMMAND} --env-file=${DOCKER_DIR}/.env -f ${DOCKER_DIR}/docker-compose.yml  up -d
stop:
	${COMPOSE_COMMAND} --env-file=${DOCKER_DIR}/.env -f ${DOCKER_DIR}/docker-compose.yml stop
restart:
	 ${COMPOSE_COMMAND} --env-file=${DOCKER_DIR}/.env -f ${DOCKER_DIR}/docker-compose.yml restart
status:
	 ${COMPOSE_COMMAND} --env-file=${DOCKER_DIR}/.env -f ${DOCKER_DIR}/docker-compose.yml ps
down:
	${COMPOSE_COMMAND} --env-file=${DOCKER_DIR}/.env -f ${DOCKER_DIR}/docker-compose.yml  down --volumes --remove-orphans
	${COMPOSE_COMMAND} --env-file=${DOCKER_DIR}/.env -f ${DOCKER_DIR}/docker-compose.yml  down --volumes --remove-orphans
login:
	 ${COMPOSE_COMMAND} --env-file=${DOCKER_DIR}/.env -f ${DOCKER_DIR}/docker-compose.yml exec  --user=1000:1000 $(service) bash
log:
	docker logs -f --since=15m $$(docker ps -f name=${COMPOSE_PROJECT_NAME}.dev --quiet)
logs:
	 ${COMPOSE_COMMAND} --env-file=${DOCKER_DIR}/.env -f ${DOCKER_DIR}/docker-compose.yml logs -f
test:
	${COMPOSE_COMMAND} --env-file=${DOCKER_DIR}/.env -f ${DOCKER_DIR}/docker-compose.yml exec --user=1000:1000 "nextjs" "bash" "-c" "ls -al /app"
	curl "http://${COMPOSE_PROJECT_NAME}.${ENV}.docker/"
add_hosts:
	./.docker/add_hosts.sh "${COMPOSE_PROJECT_NAME}.${ENV}" "${COMPOSE_PROJECT_NAME}.${ENV}.docker"