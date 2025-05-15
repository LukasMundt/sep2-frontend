FROM cloudron/base:5.0.0@sha256:04fd70dbd8ad6149c19de39e35718e024417c3e01dc9c6637eaf4a41ec4e596c

RUN mkdir -p /app/code /app/data
WORKDIR /app/code

ADD . /app/code/

# configure apache
RUN rm /etc/apache2/sites-enabled/*
RUN sed -e 's,^ErrorLog.*,ErrorLog "|/bin/cat",' -i /etc/apache2/apache2.conf
COPY apache/mpm_prefork.conf /etc/apache2/mods-available/mpm_prefork.conf
RUN a2disconf other-vhosts-access-log
RUN a2enmod rewrite proxy proxy_http headers ssl

# Erstelle Placeholder für Apache-Konfiguration und setze symbolischen Link
RUN mkdir -p /run/apache \
    && touch /run/apache/app.conf \
    && ln -s /run/apache/app.conf /etc/apache2/sites-enabled/000-app.conf


RUN echo "Listen 80" > /etc/apache2/ports.conf

RUN chmod +x /app/code/start.sh
RUN chown -R cloudron:cloudron /app/code

# install packages and build
RUN npm ci
RUN npm run build

RUN chown -R cloudron:cloudron /app/code
RUN cp -r dist/* /app/code/public

# link env file
RUN ln -s /app/data/env /app/code/.env

CMD [ "/app/code/start.sh" ]
