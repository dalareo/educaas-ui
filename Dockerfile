# https://github.com/francescou/docker-compose-ui
# DOCKER-VERSION 1.10.3
FROM python:2.7
MAINTAINER David A. Lareo <dalareo@gmail.com>

RUN apt-get install libffi-dev
RUN pip install virtualenv

WORKDIR /app
RUN virtualenv /env
ADD requirements.txt /app/requirements.txt
RUN /env/bin/pip install -r requirements.txt
ADD . /app

# RUN /env/bin/python /app/manage.py create_db
# RUN /env/bin/python /app/manage.py db init
# RUN /env/bin/python /app/manage.py db migrate

VOLUME ["/opt/docker-compose-projects"]

COPY catalog /opt/docker-compose-projects

EXPOSE 5000

# CMD ["/env/bin/python", "/app/manage.py", "runserver"]
