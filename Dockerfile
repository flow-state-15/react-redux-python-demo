
# stage 1 frontend
FROM node:16 as build-stage

COPY dynamic-react/. .

WORKDIR /dynamic-react

ENV REACT_APP_BASE_URL=https://react-redux-eod-series.herokuapp.com

RUN npm install
RUN npm run build


# stage 2 backend
FROM python:3.9

ENV FLASK_APP=app
ENV FLASK_ENV=production

WORKDIR /var/www
COPY . .
COPY --from=build-stage /dynamic-react/* app/static

EXPOSE 5000

RUN pip install -r requirements.txt


CMD gunicorn --worker-class eventlet -w 1 app:app
