ARG NODE_VERSION=18

FROM node:${NODE_VERSION}-alpine AS builder

ARG MEDUNES_VERSION
ARG MEDUNES_BUILD_TIME
ARG PLATFORM_ENVIRONMENT
ARG GITLAB_PACKAGE_TOKEN
ARG GITHUB_ID
ARG GITHUB_SECRET
ARG NEXTAUTH_SECRET

COPY ./ /app
COPY ./.docker/prod/nextjs/builder/build.sh /build.sh

RUN apk add --update bash && /build.sh

FROM dev.tn-developers.org:5050/software-engineering/devops/docker-images/medunes-node${NODE_VERSION}-nextjs-prod:latest

COPY --from=builder /app.tar.gz  /app
RUN cd /app && tar -zxvf app.tar.gz && rm -rf app.tar.gz

COPY ./.docker/prod/nextjs/init.d/31-sample-stage.sh /opt/entrypoint/init.d/31-sample-stage.sh

WORKDIR /app

ENTRYPOINT ["/opt/entrypoint/entrypoint.sh"]

EXPOSE ${NODE_PORT}
STOPSIGNAL SIGQUIT

CMD corepack yarn run start
