FROM python:3.9

# Setup Flask environment
ENV REACT_APP_BASE_URL=https://aa-react-eod-series.herokuapp.com
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

WORKDIR /var/www
COPY . .
COPY /react-app/build/* flask_backend/static/

# Install Python Dependencies
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Run flask environment
CMD gunicorn flask_backend:app

