FROM google/nodejs

WORKDIR /app

# nodegit is exteremily slow to compile so install it
# before copy file in /app (prevent rebuild)
RUN apt-get update && apt-get install -yyq zlib1g-dev openssh-client && npm install nodegit

COPY . /app
RUN	npm install -g bower && npm install && bower --allow-root install

ENV PORT 5000
EXPOSE 5000

ENTRYPOINT ssh-keygen -q -t rsa -N '' -A -f /app/keys/id_rsa && npm start
