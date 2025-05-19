FROM cloudron/base:5.0.0@sha256:04fd70dbd8ad6149c19de39e35718e024417c3e01dc9c6637eaf4a41ec4e596c

RUN mkdir -p /app/code /app/data
WORKDIR /app/code

ADD . /app/code/

RUN chmod +x /app/code/start.sh
RUN chown -R cloudron:cloudron /app/code

# link env file
RUN ln -s /app/data/env /app/code/.env \
    && cp /app/code/.env.prod-cloudron /app/data/env

# install packages and build
RUN npm ci
RUN npm run build

RUN chown -R cloudron:cloudron /app/code
RUN cp -r dist/* /app/code/public

CMD [ "/app/code/start.sh" ]
