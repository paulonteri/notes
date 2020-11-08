FROM python:3.7-alpine

ENV PYTHONUNBUFFERED 1 # environment variable
RUN mkdir /code
WORKDIR /code
COPY . /code/

# install psycopg2 dependencies
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev
RUN apk add libressl-dev musl-dev libffi-dev
RUN apk add zlib gcc python3-dev jpeg-dev zlib-dev

RUN pip install --no-cache-dir -r requirements.txt

# The maximum concurrent requests are 'workers * threads'
CMD exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --threads 8 --timeout 0 backend.wsgi:application
