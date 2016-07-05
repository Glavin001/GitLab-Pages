FROM node:4.4.7-slim

WORKDIR /app

# nodegit is exteremily slow to compile so install it
# before copy file in /app (prevent rebuild)
RUN apt-get update && apt-get install -yyq zlib1g-dev openssh-client
RUN npm install nodegit@0.12
RUN apt-get install ruby-full -yyq && gem install jekyll -N

RUN npm install -g bower
COPY package.json /app
RUN npm install
COPY bower.json /app
RUN bower --allow-root install

COPY . /app

ENV PORT 5000
EXPOSE 5000

ENTRYPOINT /app/bin/docker_start.sh
