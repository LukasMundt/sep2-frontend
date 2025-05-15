FROM cloudron/base:5.0.0@sha256:04fd70dbd8ad6149c19de39e35718e024417c3e01dc9c6637eaf4a41ec4e596c

RUN mkdir -p /app/code /app/data
WORKDIR /app/code

# copy code
ADD . /app/code/

# configure apache
RUN rm /etc/apache2/sites-enabled/*
RUN sed -e 's,^ErrorLog.*,ErrorLog "|/bin/cat",' -i /etc/apache2/apache2.conf
COPY apache/mpm_prefork.conf /etc/apache2/mods-available/mpm_prefork.conf

RUN a2disconf other-vhosts-access-log
RUN a2enmod rewrite
COPY apache/app.conf.template /app/code/apache/app.conf.template
RUN echo "Listen 80" > /etc/apache2/ports.conf

# Ensure the start.sh script has execute permissions
RUN chmod +x /app/code/start.sh

# Set ownership of the code
RUN chown -R cloudron:cloudron /app/code

# install packages
RUN npm ci

# build
RUN npm run build

RUN chown -R cloudron:cloudron /app/code
RUN cp -r dist/* /app/code/public

# link env file
RUN ln -s /app/data/env /app/code/.env

CMD [ "/app/code/start.sh" ]